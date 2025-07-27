import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("auth-token")?.value;
    const { pathname, search, origin } = request.nextUrl;

    //If user is already logged in and tries to access /login, redirect ot /dashboard
    if (pathname === "/login" && token) {
        const redirectTo = request.nextUrl.searchParams.get("redirect_to");

        if (redirectTo) {
            return NextResponse.redirect(new URL(redirectTo, origin));
        }
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    //protect routes under /dashboard or any other private toutes
    if (pathname.startsWith("/dashboard")) {
        if (!token) {
            //we save the original requested url in the redirect query param
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set(
                "redirect_to",
                encodeURIComponent(pathname + search)
            );
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/dashboard/:path*"],
};
