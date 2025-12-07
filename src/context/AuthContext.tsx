import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("loginTimestamp");
        }
    }, [token]);

    useEffect(() => {
        const checkExpiration = () => {
            const timestamp = localStorage.getItem("loginTimestamp");
            if (token && timestamp) {
                const now = Date.now();
                const loginTime = parseInt(timestamp, 10);
                const timeoutMinutes = Number(import.meta.env.VITE_SESSION_TIMEOUT) || 15;
                const expirationTime = loginTime + timeoutMinutes * 60 * 1000;

                if (now > expirationTime) {
                    logout();
                }
            } else if (token && !timestamp) {
                // If token exists but no timestamp, assume expired or invalid state
                logout();
            }
        };

        checkExpiration();
        const interval = setInterval(checkExpiration, 60 * 1000); // Check every minute

        return () => clearInterval(interval);
    }, [token]);

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem("loginTimestamp", Date.now().toString());
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext value={{ token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
