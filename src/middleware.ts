import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

interface CustomSession {
	user?: {
		id: number;
	};
}

const redirectTo = (path: string, actualUrl: string) => NextResponse.redirect(new URL(path, actualUrl));

const validateProfileAccess = (
	session: CustomSession | null,
	requestedPath: string,
	actualUrl: string
): NextResponse => {
	if (!session?.user?.id) return redirectTo("/auth/login", actualUrl);

	const { id: sessionUserId } = session.user;
	if (requestedPath.startsWith("/profile/")) {
		const profileId = Number(requestedPath.split("/")[2]);
		if (profileId !== sessionUserId) return redirectTo(`/profile/${sessionUserId}`, actualUrl);
	}

	return NextResponse.next();
};

const validateSessionActive = (
	session: CustomSession | null,
	actualUrl: string
): NextResponse => {
	if (session?.user?.id) return redirectTo("/", actualUrl); // Redirige si el usuario ya está logueado
	return NextResponse.next();
};

export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	const session = token as CustomSession | null;
	const { pathname } = req.nextUrl;


	if (pathname.startsWith("/profile")) {
		return validateProfileAccess(session, pathname, req.url);
	}
	
	if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signUp")) {
		return validateSessionActive(session, req.url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/profile/:path*", "/auth/login", "/auth/signUp"],
};
