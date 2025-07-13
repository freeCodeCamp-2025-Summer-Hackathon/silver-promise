import NextLink from "next/link";
import { ComponentProps } from "react";

/**
 * Props for the `Link` component, extending all properties from Next.js's `next/link` component.
 *
 * @remarks
 * Allows passing any prop supported by `next/link`, with an optional `className` for custom styling.
 *
 * @property className - Optional CSS class name(s) to apply to the link element.
 */
interface LinkProps extends ComponentProps<typeof NextLink> {
    className?: string;
}

/**
 * A styled link component that wraps Next.js's `next/link` and applies default
 * Tailwind CSS classes for blue text color, color transition, and underline on hover.
 *
 * @param className - Additional CSS classes to apply to the link.
 * @param props - Additional props passed to the underlying `next/link` component.
 * @returns A Next.js link element with enhanced styling.
 */
export default function Link({ className = "", ...props }: LinkProps) {
    return (
        <NextLink
            {...props}
            className={`text-blue-500 transition-colors hover:text-blue-600 hover:underline ${className}`}
        />
    );
}
