interface AlertProps {
    id: string;
    message: string;
}

export default function ErrorAlert({ message, id }: AlertProps) {
    return (
        <div
            className="relative rounded border border-[#f66] bg-red-500/25 px-4 py-3 text-red-700 dark:text-red-200"
            role="alert"
        >
            <span id={id} className="block sm:inline">
                {message}
            </span>
        </div>
    );
}
