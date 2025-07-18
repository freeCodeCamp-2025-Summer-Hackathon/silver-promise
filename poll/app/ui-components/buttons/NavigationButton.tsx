import { ButtonHTMLAttributes } from "react";

interface NavigationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    className?: string;
    onClick?: () => void;
}

export function NavigationButton({ label, onClick, className = "", ...props }: NavigationButtonProps) {
    return (
        <button
            className={`bg-navigation-background disabled:opacity-50 rounded-lg px-4 py-2 text-sm ${className}`}
            onClick={onClick}
            {...props}
        >
            {label}
        </button>
    );
}
