import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

export type Role = "ADMIN" | "USER";

export interface User {
    id: string;
    email?: string;
    role?: Role;
}

interface JWTPayload {
    uid?: string;
    id?: string;
    sub?: string;
    email?: string;
    role?: string;
    exp: number; // Expiration time in seconds since epoch
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getInitialToken = (): string | null => {
    const rawToken = localStorage.getItem("token");
    if (!rawToken) return null;

    try {
        const decoded = jwtDecode<JWTPayload>(rawToken);
        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp < now) {
            localStorage.removeItem("token");
            return null;
        }
        return rawToken;
    } catch {
        localStorage.removeItem("token");
        return null;
    }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // Lazy initializers based on performance guidelines, strictly validating JWT before mount
    const [token, setToken] = useState<string | null>(getInitialToken);

    const logout = useCallback(() => {
        setToken(null);
        localStorage.removeItem("token");
    }, []);

    const login = useCallback((newToken: string) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    }, []);

    const parsedToken = useMemo(() => {
        if (!token) return null;
        try {
            return jwtDecode<JWTPayload>(token);
        } catch {
            return null;
        }
    }, [token]);

    const user: User | null = useMemo(() => {
        if (!parsedToken) return null;
        return {
            id: parsedToken.uid || parsedToken.sub || parsedToken.id || "unknown",
            email: parsedToken.email,
            role: (parsedToken.role?.toUpperCase() as Role) || "USER",
        };
    }, [parsedToken]);

    // Setup native cryptographic expiration timeout
    useEffect(() => {
        if (!parsedToken?.exp) return;

        const timeUntilExpiryMs = Math.max((parsedToken.exp - (Date.now() / 1000)) * 1000, 0);

        // Handle edge-case immediately expired token (deferred to avoid cascade render error)
        if (timeUntilExpiryMs === 0) {
            setTimeout(logout, 0);
            return;
        }

        const timeoutId = setTimeout(() => {
            logout();
        }, timeUntilExpiryMs);

        return () => clearTimeout(timeoutId);
    }, [parsedToken, logout]);

    return (
        <AuthContext value={{ token, user, login, logout, isAuthenticated: !!token && !!user }}>
            {children}
        </AuthContext>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
