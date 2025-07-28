import { PollRepository } from "@/lib/db/repositories/pollRepository";
import { AuthService } from "@/lib/services/authService";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    // Get the Authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response("Missing or invalid Authorization header", {
            status: 401,
        });
    }

    // Extract the token from the header
    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) {
        return new Response("Token is required", { status: 400 });
    }

    const user = AuthService.resolveUserFromToken(token);

    if (!user) {
        return new Response("Invalid token", { status: 401 });
    }

    // Handle the request with the authenticated user
    const polls = await PollRepository.getPollsByUserId(Number(user.id));
    return new Response(JSON.stringify(polls.toReversed()), { status: 200 });
}
