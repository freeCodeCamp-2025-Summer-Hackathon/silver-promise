"use client";

import { PrimaryButtonWithArrowRight } from "@/app/ui-components/buttons/PrimaryButton";
import FloatingLabelInput from "@/app/ui-components/inputs/FloatingLabelInput";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [inputValues, setInputValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        console.log("Form submitted:", inputValues);
    };

    return (
        <div className="flex h-screen p-24">
            <div className="flex w-1/3 flex-col items-center justify-center">
                <form className="flex w-full max-w-sm flex-col space-y-8">
                    <h1 className="mb-4 text-4xl font-bold">Login to Polls</h1>
                    <p className="text-sm text-gray-500">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-blue-500 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                    <div className="flex flex-col space-y-4">
                        {/* <FloatingLabelInput label="Username" value="" /> */}
                        <FloatingLabelInput
                            label="Email"
                            value={inputValues.email}
                            type="email"
                            name="email"
                            onChange={handleChange}
                        />
                        <FloatingLabelInput
                            label="Password"
                            value={inputValues.password}
                            type="password"
                            name="password"
                            onChange={handleChange}
                        />
                        <PrimaryButtonWithArrowRight
                            label="Login"
                            type="submit"
                            onClick={handleSubmit}
                        />
                    </div>
                </form>
                <hr className="w-100 my-8 text-gray-300"></hr>
                <div className="flex flex-col items-center justify-center gap-7">
                    <p className="text-sm text-gray-500">OR</p>

                    <button className="text-foreground w-sm rounded-2xl border p-2 transition-colors">
                        Google
                    </button>
                </div>
            </div>
        </div>
    );
}
