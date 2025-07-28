import { AuthService } from "../services/authService";

export function getUserFromRequest(request: Request) {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) return null;

    try {
        const user = AuthService.verifyToken(token);
        return user;
    } catch (error) {
        console.error("Failed to authenticate user:", error);
        return null;
    }
}

