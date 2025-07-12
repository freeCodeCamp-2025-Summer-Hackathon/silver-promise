"use client";

import Image from "next/image";
import { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps {
    label: string;
    type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onSubmit?: (e: React.FormEvent<HTMLButtonElement>) => void;
}

/**
 * Renders a primary styled button with a gradient background.
 *
 * @param label - The text to display inside the button.
 * @param onClick - Optional click event handler for the button. Defaults to a no-op function.
 * @param type - Optional button type attribute. Defaults to "button".
 *
 * @returns A styled button component.
 */
export function PrimaryButton({
    label,
    onClick = () => {},
    type = "button",
}: PrimaryButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="from-soft-red to-dark-violet hover:from-soft-red-hover hover:to-dark-violet-hover rounded-2xl bg-gradient-to-r p-2 text-white hover:bg-gradient-to-r hover:transition-colors"
        >
            {label}
        </button>
    );
}

/**
 * PrimaryButtonWithArrowRight renders a styled button with a label and a right-pointing arrow icon.
 *
 * @param label - The text to display inside the button.
 * @param onClick - Optional click event handler for the button. Defaults to a no-op function.
 * @param type - Optional button type attribute. Defaults to "button".
 *
 * The button uses a gradient background and displays an arrow icon on the right side of the label.
 */
export function PrimaryButtonWithArrowRight({
    label,
    onClick = () => {},
    type = "button",
    onSubmit = () => {},
}: PrimaryButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            onSubmit={onSubmit}
            className="from-soft-red to-dark-violet hover:from-soft-red-hover hover:to-dark-violet-hover w-full cursor-pointer rounded-2xl bg-gradient-to-r p-2 text-white hover:bg-gradient-to-r hover:transition-colors"
        >
            <div className="flex items-center justify-between px-2">
                <p>{label}</p>
                <Image
                    src="/arrow-right.svg"
                    alt=""
                    width={30}
                    height={30}
                    className="invert"
                />
            </div>
        </button>
    );
}
