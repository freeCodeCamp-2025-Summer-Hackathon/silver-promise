import { RegisterResponse } from "@/lib/types/Responses";
import { NextRequest } from "next/server";
import { AuthService } from "@/lib/services/authService";

export async function POST(request: NextRequest) {
    try {
        const { username, email, country, password, confirmPassword } = await request.json();

        // Validate required fields
        if (!username || !email || !password || !confirmPassword) {
            const response: RegisterResponse = { success: false, message: "All fields are required", };
            return Response.json(response, { status: 400 });
        }

        if (password !== confirmPassword) {
            const response: RegisterResponse = {
                success: false,
                message: "Passwords do not match",
            };
            return Response.json(response, { status: 400 });
        }

        // Validate email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            const response: RegisterResponse = { success: false, message: "Invalid email format", };
            return Response.json(response, { status: 400 });
        }

        const result = await AuthService.registerUser(username, email, country, password);

        if (result.success) {
            const responseData: RegisterResponse = { success: true, message: "Registration successful", user: result.user, };
            return Response.json(responseData, { status: 201 });
        } else {
            const response: RegisterResponse = { success: false, message: result.message, };
            return Response.json(response, { status: 400 });
        }
    } catch {
        const responseData: RegisterResponse = { success: false, message: "Internal server error", };
        return Response.json(responseData, { status: 500 });
    }
}