import { LoginResponseData } from "@/lib/types/Responses";
import { NextRequest } from "next/server";
import { AuthService } from "@/lib/services/authService";

export async function POST(request: NextRequest) {
    try {
        const { userIdentifier, password } = await request.json();

        const result = await AuthService.validateLogin(userIdentifier, password);

        if (result.success) {
            const responseData: LoginResponseData = {
                success: true,
                message: "Login successful",
                user: result.user
            };

            const response = Response.json(responseData, { status: 200 });

            response.headers.set(
                "Set-Cookie",
                `auth-token=${result.token}; HttpOnly; Path=/; Max-Age=${24 * 60 * 60}; Secure=${process.env.NODE_ENV === "production"}; SameSite=Lax`
            );

            return response;
        } else {
            const responseData: LoginResponseData = {
                success: false,
                message: result.message
            };

            return Response.json(responseData, { status: 401 });
        }
    } catch {
        const responseData: LoginResponseData = {
            success: false,
            message: "Internal server error",
        };

        return Response.json(
            responseData,
            { status: 500 }
        )
    }
}