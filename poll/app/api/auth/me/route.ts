import { NextRequest } from "next/server";
import { AuthService } from "@/lib/services/authService";
import { User } from "@/lib/types/User";
import { MeResponseData } from "@/lib/types/Responses";

export async function GET(request: NextRequest) {
    try {
        // Read JWT token
        const token = request.cookies.get("auth-token")?.value;

        if (!token) {
            const response: MeResponseData = { success: false, message: "No token provided", };
            return Response.json(response, { status: 401 });
        }

        // Verify token
        const decoded = AuthService.verifyToken(token);

        if (!decoded || typeof decoded === "string") {
            const response: MeResponseData = {
                success: false,
                message: "Invalid token",
            };
            return Response.json(response, { status: 401 });
        }

        // Get user data from token
        const user: User = {
            id: decoded.userId,
            username: decoded.username,
            email: decoded.email,
            country: decoded.country || "unknown",
        };

        const response: MeResponseData = {
            success: true,
            message: "User authenticated",
            user,
        };

        return Response.json(response);
    } catch {
        const response: MeResponseData = {
            success: false,
            message: "Internal server error",
        };
        return Response.json(response, { status: 500 });
    }
}
