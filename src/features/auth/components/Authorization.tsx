import React from "react";
import { useAuth } from "../context/AuthContext";
import type { Role } from "../context/AuthContext";

interface AuthorizationProps {
    allowedRoles: Role[];
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

/**
 * A wrapper component that enforces Role-Based Access Control (RBAC).
 * Following the Bulletproof React Security guidelines, this component selectively
 * renders its children only if the currently authenticated user's role matches
 * one of the explicitly allowed roles.
 */
export const Authorization = ({ allowedRoles, children, fallback = null }: AuthorizationProps) => {
    const { user } = useAuth();

    // If there is no user, or the user's explicit role is not in the allowed list, reject rendering.
    if (!user || !user.role || !allowedRoles.includes(user.role)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
};
