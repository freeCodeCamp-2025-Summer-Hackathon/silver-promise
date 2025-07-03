"use client";

import Image from "next/image";
import { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps {
  label: string;
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
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
export default function PrimaryButtonWithArrowRight({
    label,
    onClick = () => { },
    type = "button",
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
              bg-gradient-to-r from-soft-red to-dark-violet 
              text-white p-2 rounded-2xl hover:transition-colors
              hover:bg-gradient-to-r hover:from-soft-red-hover hover:to-dark-violet-hover"
    >
      <div className="flex items-center px-2 justify-between">
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
