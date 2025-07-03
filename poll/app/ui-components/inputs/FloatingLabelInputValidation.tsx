"use client";

interface FloatingLabelInputValidationProps {
  label: string;
  value: string;
  type: HTMLInputElement["type"];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isInvalid?: boolean;
  errorMessage?: string;
  name?: string;
  required?: boolean;
}

/**
 * A floating label input component with validation support.
 *
 * Renders a styled input field with a floating label, validation error message, and customizable props.
 * The label animates above the input when focused or filled. Displays an error message and red border when invalid.
 *
 * @param label - The label text displayed for the input.
 * @param value - The current value of the input.
 * @param type - The input type (e.g., "text", "email", "password"). Defaults to "text".
 * @param onChange - Callback fired when the input value changes.
 * @param errorMessage - The error message to display when the input is invalid.
 * @param isInvalid - Whether the input is in an invalid state.
 * @param name - The name attribute for the input.
 * @param required - Whether the input is required.
 *
 * @returns A React component rendering a floating label input with validation feedback.
 */
export default function FloatingLabelInputValidation({
  label,
  value,
  type = "text",
  onChange,
  errorMessage = "",
  isInvalid = false,
  name = "",
  required = false,
}: FloatingLabelInputValidationProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    value = e.target.value;
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={handleChange}
        name={name}
        placeholder=" "
        id={name || "floating_outlined"}
        className={`p-2.5 border rounded-2xl focus:outline-none focus:ring-2 transition duration-200 peer w-full ${
          isInvalid
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
        required={required}
      />
      <label
        htmlFor={name || "floating_outlined"}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-background px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
      {isInvalid && (
        <p className="text-red-500 text-sm -mt-3 translate-y-4">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
