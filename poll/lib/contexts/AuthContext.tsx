"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface User {
    id: string;
    username: string;
    email: string;
    country?: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Provides authentication context to its children components.
 * 
 * This component manages the authentication state (`user`), loading state (`isLoading`),
 * and exposes `login` and `logout` methods via the `AuthContext`.
 * 
 * On mount, it checks the current authentication status by calling `/api/auth/me`.
 * 
 * @param children - The child React nodes that will have access to the authentication context.
 * @returns The `AuthContext.Provider` wrapping the children.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch("/api/auth/me");

            if (response.ok) {
                const data = await response.json();
                if (data.success && data.user) {
                    setUser(data.user);
                }
            }
        } catch (error) {
            console.error("Auth check failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
