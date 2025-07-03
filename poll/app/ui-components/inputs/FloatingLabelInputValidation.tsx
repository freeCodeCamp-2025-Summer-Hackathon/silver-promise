"use client";

import React, { useState } from "react";

interface FloatingLabelInputValidationProps {
  label: string;
  value: string;
  errorCheck?: (value: string) => boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isInvalid?: boolean;
  errorMessage?: string;
}

export default function FloatingLabelInputValidation({
  label,
  value,
  onChange,
  errorCheck,
  errorMessage = "",
  isInvalid = false,
}: FloatingLabelInputValidationProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isInvalidValue, setInvalid] = useState(isInvalid);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setInvalid(errorCheck ? errorCheck(e.target.value) : false);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="relative">
      <input
        type="password"
        value={inputValue}
        onChange={handleChange}
        name="repeatPassword"
        id="floating_outlined"
        className={`p-2.5 border rounded-2xl focus:outline-none focus:ring-2 transition duration-200 peer w-full ${
          isInvalidValue
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
        required
      />
      <label
        htmlFor="floating_outlined"
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-background px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
      {isInvalidValue && (
        <p className="text-red-500 text-sm -mt-3 translate-y-4">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
