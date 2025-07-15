interface AlertProps {
    id: string;
    message: string;
}

export default function ErrorAlert({ message, id }: AlertProps) {
    return (
        <div className="bg-red-500/25 border border-[#f66] text-red-700 dark:text-red-200 px-4 py-3 rounded relative" role="alert">
            <span id={id} className="block sm:inline">{message}</span>
        </div>
    );
}