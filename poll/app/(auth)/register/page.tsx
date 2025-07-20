"use client";

import { PrimaryButtonWithArrowRight } from "@/app/ui-components/buttons/PrimaryButton";
import FloatingLabelInput from "@/app/ui-components/inputs/FloatingLabelInput";
import FloatingLabelInputValidation from "@/app/ui-components/inputs/FloatingLabelInputValidation";
import FloatingLabelSelectInput from "@/app/ui-components/inputs/FloatingLabelSelectInput";
import { countries } from "@/lib/countries";
import Image from "next/image";
import Link from "@/app/ui-components/buttons/Link";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import ErrorAlert from "@/app/ui-components/alerts/Error";

export default function Register() {
    const router = useRouter();
    const { login, isLoading, user } = useAuth();

    // Validate password match
    const [passwordInput, setPasswordInput] = useState({
        password: "",
        confirmPassword: "",
    });

    // Error state for password match validation
    const [errors, setErrors] = useState({
        passwordMatch: false,
    });

    // Error messages for already existing user or other errors
    const [errorMessage, setErrorMessage] = useState("");
    const [isErrorVisible, setIsErrorVisible] = useState(false);

    // Validate email format
    function validateEmail(email: string): boolean {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    // Redirect to dashboard if user is logged in
    useEffect(() => {
        if (!isLoading && user) {
            router.push("/dashboard");
        }
    }, [user, isLoading, router]);

    // UI indicator for form submission
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handlePasswordInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setPasswordInput((prev) => ({
            ...prev,
            [name]: value,
        }));

        const password = name === "password" ? value : passwordInput.password;
        const confirmPassword =
            name === "confirmPassword" ? value : passwordInput.confirmPassword;

        setErrors((prev) => ({
            ...prev,
            passwordMatch:
                password !== confirmPassword && confirmPassword !== "",
        }));
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setIsErrorVisible(false);
        setErrorMessage("");

        try {
            const formData = new FormData(e.currentTarget);
            const data = {
                username: formData.get("username") as string,
                email: formData.get("email") as string,
                country: formData.get("country") as string,
                password: formData.get("password") as string,
                confirmPassword: formData.get("confirmPassword") as string,
            };

            if (data.password !== data.confirmPassword) {
                setErrors((prev) => ({ ...prev, passwordMatch: true }));
                return;
            }

            if (!validateEmail(data.email)) {
                setErrorMessage("Invalid email format\n");
                setIsErrorVisible(true);
                return;
            }

            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const loginResponse = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userIdentifier: data.email,
                        password: data.password,
                    }),
                });

                if (loginResponse.ok) {
                    const loginResponseData = await loginResponse.json();
                    login(loginResponseData.user);
                } else {
                    const errorData = await loginResponse.json();
                    setErrorMessage(errorData.message || "Login failed");
                    setIsErrorVisible(true);
                }
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Registration failed");
                setIsErrorVisible(true);
            }
        } catch {
            setErrorMessage("Network error. Please try again later.");
            setIsErrorVisible(true);
        } finally {
            setIsSubmitting(false);
        }
    }

    // Do not render if the user is logged in
    if (user) {
        return null;
    }

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
                    <div
                        id="error-container"
                        className="mb-4 rounded-lg border-2 border-red-500 text-red-500"
                        hidden={!isErrorVisible}
                    >
                        <ErrorAlert id="error-alert" message={errorMessage} />
                    </div>
                    <div className="flex flex-col space-y-4 bg-inherit">
                        <FloatingLabelInput
                            label="Username"
                            name="username"
                            required
                            type="text"
                        />
                        <FloatingLabelInput
                            label="Email"
                            name="email"
                            type="email"
                            required
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
                            onChange={handlePasswordInputChange}
                            type="password"
                            value={passwordInput.password}
                            required
                        />
                        <FloatingLabelInputValidation
                            type="password"
                            label="Confirm Password"
                            name="confirmPassword"
                            value={passwordInput.confirmPassword}
                            onChange={handlePasswordInputChange}
                            errorMessage="Passwords do not match"
                            isInvalid={errors.passwordMatch}
                        />
                        <PrimaryButtonWithArrowRight
                            label={
                                isSubmitting
                                    ? "Creating Account..."
                                    : "Register"
                            }
                            type="submit"
                            disabled={isSubmitting}
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
