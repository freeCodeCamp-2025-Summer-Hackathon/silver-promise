"use client";

import { PrimaryButtonWithArrowRight } from "@/app/ui-components/buttons/PrimaryButton";
import FloatingLabelInput from "@/app/ui-components/inputs/FloatingLabelInput";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        console.log("Form submitted:", formData);
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
                            value={formData.email}
                            type="email"
                            name="email"
                            onChange={handleChange}
                        />
                        <FloatingLabelInput
                            label="Password"
                            value={formData.password}
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
                <hr className="w-100 m-8 text-gray-600"></hr>
                <div className="flex flex-col items-center justify-center space-y-4">
                    <p className="text-sm text-gray-500">OR</p>
                    <div className="flex flex-col space-y-2">
                        <button className="text-foreground w-sm rounded-2xl border p-2 transition-colors">
                            Google
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex w-2/3 items-center justify-center">
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
