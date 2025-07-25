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
 * @param name - The name attribute for the input.
 * @param onChange - Callback fired when the input value changes.
 * @param type - The input type (e.g., "text", "email", "password"). Defaults to "text".
 * @param errorMessage - The error message to display when the input is invalid.
 * @param isInvalid - Whether the input is in an invalid state.
 * @param required - Whether the input is required.
 *
 * @returns A React component rendering a floating label input with validation feedback.
 */
export default function FloatingLabelInputValidation({
    label,
    value,
    name,
    onChange,
    type = "text",
    errorMessage = "",
    isInvalid = false,
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
                className={`peer w-full rounded-2xl border p-2.5 transition duration-200 focus:outline-none focus:ring-2 ${
                    isInvalid
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                }`}
                required={required}
            />
            <label
                htmlFor={name || "floating_outlined"}
                className="bg-background absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
                {label}
            </label>
            {isInvalid && (
                <p className="-mt-3 translate-y-4 text-sm text-red-500">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}
