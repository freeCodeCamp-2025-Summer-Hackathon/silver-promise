"use client";

import React, { HTMLInputTypeAttribute, useState } from "react";

interface FloatingLabelInputProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  name?: string;
  required?: boolean;
}

/**
 * A floating label input component for forms.
 *
 * Renders an input field with a label that floats above the input when focused or filled.
 *
 * @param label - The label text displayed for the input.
 * @param value - The current value of the input.
 * @param onChange - Callback fired when the input value changes.
 * @param name - The name attribute for the input element.
 * @param type - The type of the input (e.g., "text", "password"). Defaults to "text".
 * @param required - Whether the input is required. Defaults to false.
 *
 * @returns A styled input component with a floating label.
 */
export default function FloatingLabelInput({
  label,
  value,
  onChange,
  name,
  type = "text",
  required = false,
}: FloatingLabelInputProps) {
  const [inputValue, setValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="relative">
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        name={name}
        id="floating_outlined"
        className="p-2.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 peer w-full"
        required={required}
      />
      <label
        htmlFor="floating_outlined"
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-background px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
    </div>
  );
}
