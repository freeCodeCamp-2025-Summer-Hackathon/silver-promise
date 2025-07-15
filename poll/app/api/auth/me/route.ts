import { NextRequest } from "next/server";
import { AuthService } from "@/lib/services/authService";

export async function GET(request: NextRequest) {
    try {
        // Read JWT token 
        const token = request.cookies.get("auth-token")?.value;

        if (!token) {
            return Response.json(
                { success: false, message: "No token provided" },
                { status: 401 }
            );
        }

        // Verify token
        const decoded = AuthService.verifyToken(token);

        if (!decoded || typeof decoded === "string") {
            return Response.json(
                { success: false, message: "Invalid token" },
                { status: 401 }
            );
        }

        // Get user data from token
        const userData = {
            id: decoded.userId,
            username: decoded.username,
            email: decoded.email,
            country: decoded.country || "unknown"
        };

        return Response.json({
            success: true,
            user: userData
        });

    } catch (error) {
        return Response.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}