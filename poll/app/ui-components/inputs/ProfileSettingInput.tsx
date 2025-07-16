"use client";

import { EditIcon } from "@/public/svgs/edit";
import { Inter } from "next/font/google";

interface ProfileSettingInputProps {
    label: string;
    data: string;
}

const inter = Inter({
    subsets: ["latin"],
});

export default function ProfileSettingInput({
    label,
    data,
}: ProfileSettingInputProps) {
    return (
        <div>
            <p className="text-cards-foreground text-[0.75rem] font-medium">
                {label}
            </p>
            <div className="mt-[0.375rem] flex items-center gap-[1.5rem]">
                <p className={`${inter.className} max-w-[65%] font-bold`}>
                    {data}
                </p>
                <div>
                    <EditIcon />
                </div>
            </div>
        </div>
    );
}
