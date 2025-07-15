"use client";

import { PrimaryButtonWithArrowRight } from "@/app/ui-components/buttons/PrimaryButton";
import FloatingLabelInput from "@/app/ui-components/inputs/FloatingLabelInput";
import Image from "next/image";
import Link from "@/app/ui-components/buttons/Link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import ErrorAlert from "@/app/ui-components/alerts/Error";

/**
 * Renders the login page for the Polls application.
 *
 * This component provides a form for users to log in using their email/username and password.
 * It handles form state, submission, and error display. If the user is already authenticated,
 * they are redirected to the dashboard. While authentication status is loading, a loading
 * indicator is shown.
 *
 * @component
 * @returns {JSX.Element | null} The login page UI, a loading indicator, or null if the user is logged in.
 */
export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading, user } = useAuth();

    const [credentials, setCredentials] = useState({
        userIdentifier: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        if (!isLoading && user) {
            router.push("/dashboard");
        }
    }, [user, isLoading, router]);

    /**
     * Handles changes to input fields by updating the corresponding property
     * in the credentials state object. Extracts the `name` and `value` from the
     * input event target and updates the state accordingly.
     *
     * @param e - The change event from an HTML input element.
     */
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    /**
     * Handles the login form submission event.
     *
     * Prevents the default form submission behavior, extracts user credentials from the form,
     * sends a POST request to the authentication API endpoint, and processes the response.
     * On successful authentication, logs in the user with the returned user data.
     * On failure, displays an error message to the user.
     *
     * @param event - The form submission event.
     */
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const loginCredentials = {
            userIdentifier: formData.get("userIdentifier") as string,
            password: formData.get("password") as string,
        };

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginCredentials),
        });

        if (response.ok) {
            const data = await response.json();
            login(data.user);
        } else {
            const errorData = await response.json();
            showError(errorData.message || "Login failed");
        }
    }

    function showError(message: string) {
        const errorContainer = document.getElementById("error-container");
        setErrorMessage(message)

        if (errorContainer) {
            errorContainer.classList.remove("hidden");
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
                    <h1 className="mb-4 text-4xl font-bold">Login to Polls</h1>
                    <p className="text-sm text-gray-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/register">Register</Link>
                    </p>
                    <div
                        id="error-container"
                        className="mb-4 hidden rounded-lg border-2 border-red-500 text-red-500"
                    >
                        <ErrorAlert id="error-alert" message={errorMessage} />
                    </div>
                    <div className="flex flex-col space-y-4 bg-inherit">
                        <FloatingLabelInput
                            label="Email/Username"
                            value={credentials.userIdentifier}
                            type="text"
                            name="userIdentifier"
                            onChange={handleChange}
                        />
                        <FloatingLabelInput
                            label="Password"
                            value={credentials.password}
                            type="password"
                            name="password"
                            onChange={handleChange}
                        />
                        <PrimaryButtonWithArrowRight
                            label="Login"
                            type="submit"
                        />
                    </div>
                </form>
                {/* INFO: Placeholder for social login options
                <hr className="w-100 my-8 text-gray-300"></hr>
                <div className="flex flex-col items-center justify-center gap-7">
                    <p className="text-sm text-gray-500">OR</p>

                    <button className="text-foreground w-sm rounded-2xl border p-2 transition-colors">
                        Google
                    </button>
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
