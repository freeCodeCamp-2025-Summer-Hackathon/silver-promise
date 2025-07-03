"use client";

import React, { HTMLInputTypeAttribute } from "react";

interface FloatingLabelInputProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute | undefined;
  name?: string;
  required?: boolean;
}

/**
 * A reusable input component with a floating label effect.
 *
 * @param label - The text to display as the floating label.
 * @param value - The current value of the input.
 * @param onChange - Callback function to handle input value changes.
 * @param name - The name and id attribute for the input element.
 * @param type - The type of the input (e.g., "text", "email", "password"). Defaults to "text".
 * @param required - Whether the input is required. Defaults to false.
 *
 * @returns A styled input field with a floating label.
 */
export default function FloatingLabelInput({
  label,
  value,
  onChange,
  name,
  type = "text",
  required = false,
}: FloatingLabelInputProps) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        id={name || "floating_outlined"}
        placeholder=" "
        className="p-2.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 peer w-full"
        required={required}
      />
      <label
        htmlFor={name || "floating_outlined"}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-background px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
    </div>
  );
}
