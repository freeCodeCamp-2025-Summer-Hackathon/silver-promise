"use client";

import { PrimaryButtonWithArrowRight } from "@/app/ui-components/buttons/PrimaryButton";
import FloatingLabelInput from "@/app/ui-components/inputs/FloatingLabelInput";
import FloatingLabelInputValidation from "@/app/ui-components/inputs/FloatingLabelInputValidation";
import FloatingLabelSelectInput from "@/app/ui-components/inputs/FloatingLabelSelectInput";
import { countries } from "@/lib/countries";
import Image from "next/image";
import Link from "@/app/ui-components/buttons/Link";
import { useState } from "react";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        passwordMatch: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "password" || name === "confirmPassword") {
            const password = name === "password" ? value : formData.password;
            const confirmPassword =
                name === "confirmPassword" ? value : formData.confirmPassword;

            setErrors((prev) => ({
                ...prev,
                passwordMatch:
                    password !== confirmPassword && confirmPassword !== "",
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="flex h-screen bg-inherit p-24">
            <div className="flex w-1/3 flex-col items-center justify-center bg-inherit">
                <form
                    className="flex w-full max-w-sm flex-col space-y-8 bg-inherit"
                    onSubmit={handleSubmit}
                >
                    <h1 className="mb-4 text-4xl font-bold">Create Account</h1>
                    <p className="text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link href="/login">Log in</Link>
                    </p>
                    <div className="flex flex-col space-y-4 bg-inherit">
                        <FloatingLabelInput
                            label="Username"
                            name="username"
                            required
                            onChange={handleInputChange}
                            type="text"
                            value={formData.username}
                        />
                        <FloatingLabelInput
                            label="Email"
                            name="email"
                            onChange={handleInputChange}
                            type="email"
                            required
                            value={formData.email}
                        />
                        <FloatingLabelSelectInput
                            label="Country"
                            value=""
                            name="country"
                            options={countries}
                        />
                        <FloatingLabelInput
                            label="Password"
                            name="password"
                            onChange={handleInputChange}
                            type="password"
                            value={formData.password}
                            required
                        />
                        <FloatingLabelInputValidation
                            type="password"
                            label="Confirm Password"
                            name="confirm_password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            errorMessage="Passwords do not match"
                            isInvalid={errors.passwordMatch}
                        />
                        <PrimaryButtonWithArrowRight
                            label="Register"
                            type="submit"
                        />
                    </div>
                </form>
                {/* INFO: Placeholder for social login options
                <hr className="w-100 m-8 text-gray-600"></hr>
                <div className="flex flex-col items-center justify-center space-y-4">
                    <p className="text-sm text-gray-500">OR</p>
                    <div className="flex flex-col space-y-2">
                        <button className="text-foreground w-sm rounded-2xl border p-2 transition-colors">
                            Google
                        </button>
                    </div>
                </div>
                */}
            </div>

            <div className="flex w-2/3 items-center justify-center">
                <Image
                    src="/ballot-box.svg"
                    alt=""
                    width={750}
                    height={750}
                    className="dark:invert-85 h-auto"
                />
            </div>
        </div>
    );
}
