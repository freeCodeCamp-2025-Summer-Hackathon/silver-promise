"use client";

import { PrimaryButtonWithArrowRight } from "@/app/ui-components/buttons/PrimaryButton";
import FloatingLabelInput from "@/app/ui-components/inputs/FloatingLabelInput";
import FloatingLabelInputValidation from "@/app/ui-components/inputs/FloatingLabelInputValidation";
import FloatingLabelSelectInput from "@/app/ui-components/inputs/FloatingLabelSelectInput";
import { countries } from "@/lib/countries";
import Image from "next/image";
import Link from "next/link";
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
        passwordMatch: password !== confirmPassword && confirmPassword !== "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, passwordMatch: true }));
      return;
    }

    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex h-screen p-24">
      <div className="w-1/3 flex items-center flex-col justify-center">
        <form
          className="flex flex-col space-y-8 w-full max-w-sm"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-bold mb-4">Create Account</h1>
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
          <div className="flex flex-col space-y-4">
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
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              errorMessage="Passwords do not match"
              isInvalid={errors.passwordMatch}
            />
            <PrimaryButtonWithArrowRight label="Register" type="submit" />
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
          className="dark:invert-85 h-auto"
        />
      </div>
    </div>
  );
}
