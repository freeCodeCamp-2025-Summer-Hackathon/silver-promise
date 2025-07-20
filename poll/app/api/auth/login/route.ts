import { NextRequest } from "next/server";
import { AuthService } from "@/lib/services/authService";
import { LoginResponse } from "@/lib/types/Responses";

export async function POST(request: NextRequest) {
    try {
        const { userIdentifier, password } = await request.json();

        if (!userIdentifier || !password) {
            const response: LoginResponse = {
                success: false,
                message: "Email/username and password are required",
            };
            return Response.json(response, { status: 400 });
        }

        const result = await AuthService.validateLogin(
            userIdentifier,
            password
        );

        if (result.success) {
            const response: LoginResponse = {
                success: true,
                message: "Login successful",
                user: result.user,
                token: result.token,
            };

            const httpResponse = Response.json(response);
            httpResponse.headers.set(
                "Set-Cookie",
                `auth-token=${result.token}; Path=/; Max-Age=${2 * 24 * 60 * 60}; SameSite=Lax`
            );

            return httpResponse;
        } else {
            const response: LoginResponse = {
                success: false,
                message: result.message,
            };
            return Response.json(response, { status: 401 });
        }
    } catch {
        const response: LoginResponse = {
            success: false,
            message: "Internal server error",
        };
        return Response.json(response, { status: 500 });
    }
}
