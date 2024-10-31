import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

interface CustomSession {
	user?: {
		id: number;
	};
}

const redirectTo = (path: string, actualUrl: string) => NextResponse.redirect(new URL(path, actualUrl));

const validateUserAccess = (
	session: CustomSession | null,
	requestedPath: string,
	actualUrl: string
): NextResponse => {
	if (!session?.user?.id) return redirectTo("/login", actualUrl);

	const { id: sessionUserId } = session.user;
	if (requestedPath.startsWith("/profile/")) {
		const profileId = Number(requestedPath.split("/")[2]);
		if (profileId !== sessionUserId) return redirectTo(`/profile/${sessionUserId}`, actualUrl);
	}

	return NextResponse.next();
};

export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	const session = token as CustomSession | null;

	return validateUserAccess(session, req.nextUrl.pathname, req.url);
}

export const config = {
	matcher: ["/dashboard/:path*", "/profile/:path*"],
};
