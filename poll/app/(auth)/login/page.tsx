"use client";

import { PrimaryButtonWithArrowRight } from "@/app/ui-components/buttons/PrimaryButton";
import FloatingLabelInput from "@/app/ui-components/inputs/FloatingLabelInput";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex h-screen p-24">
      <div className="w-1/3 flex items-center flex-col justify-center">
        <form className="flex flex-col space-y-8 w-full max-w-sm">
          <h1 className="text-4xl font-bold mb-4">Login to Polls</h1>
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
          <div className="flex flex-col space-y-4">
            {/* <FloatingLabelInput label="Username" value="" /> */}
            <FloatingLabelInput label="Email" value="" type="email" />
            <FloatingLabelInput label="Password" value="" type="password" />
            <PrimaryButtonWithArrowRight label="Login" type="submit" />
          </div>
        </form>
        <hr className="w-100 text-gray-600 m-8"></hr>
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-sm text-gray-500">OR</p>
          <div className="flex flex-col space-y-2">
            <button className="border text-foreground p-2 rounded-2xl transition-colors w-sm">
              Google
            </button>
          </div>
        </div>
      </div>
      <div className="w-2/3 flex items-center justify-center">
        <Image
          src="/ballot-box.svg"
          alt="Login Page"
          width={750}
          height={750}
          className="dark:invert-85"
        />
      </div>
    </div>
  );
}
