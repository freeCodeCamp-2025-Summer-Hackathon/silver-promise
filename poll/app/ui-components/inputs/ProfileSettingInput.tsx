"use client"

import { EditIcon } from "@/public/svgs/edit";
import { Inter } from "next/font/google";

interface ProfileSettingInputProps {
  label: string;
  data: string;
}

const inter = Inter({
  subsets: ["latin"],
})

export default function ProfileSettingInput({
  label,
  data
 }: ProfileSettingInputProps) {
  return (
    <div>
      <p className="font-medium text-[0.75rem] text-cards-foreground">{label}</p>
      <div className="flex gap-[1.5rem] items-center mt-[0.375rem]">
        <p className={`${inter.className} font-bold max-w-[65%]`}>{data}</p>
        <div >
          <EditIcon />
        </div>
      </div>
    </div>
  );
}