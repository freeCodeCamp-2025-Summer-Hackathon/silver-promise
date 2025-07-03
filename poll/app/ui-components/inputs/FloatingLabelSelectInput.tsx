"use client";

import React, { useState } from "react";

interface FloatingLabelSelectInputProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * A floating label select input component for forms.
 *
 * Renders a styled `<select>` element with a floating label that animates
 * when the select is focused or has a value. Useful for modern UI forms
 * where labels should not overlap with user input.
 *
 * @param label - The label text to display for the select input.
 * @param value - The current selected value of the select input.
 * @param options - An array of option objects to display in the dropdown. Each option should have a `label` and `value`.
 * @param onChange - Optional change handler called when the selected value changes.
 *
 * @example
 * ```tsx
 * <FloatingLabelSelectInput
 *   label="Country"
 *   value={selectedCountry}
 *   options={[
 *     { label: "USA", value: "us" },
 *     { label: "Canada", value: "ca" }
 *   ]}
 *   onChange={handleCountryChange}
 * />
 * ```
 */
export default function FloatingLabelSelectInput({
  label,
  value,
  options,
  onChange,
}: FloatingLabelSelectInputProps) {
  const [selectValue, setSelectValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="relative">
      <select
        title="Country"
        id="country"
        value={selectValue}
        onChange={handleChange}
        className="p-2.5 border appearance-none border-gray-300 rounded-2xl bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 peer w-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: "right 0.5rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.5em 1.5em",
        }}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-background px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
        {label}
      </label>
    </div>
  );
}
