import { NextResponse } from "next/server";
import db from '@/lib/db';

export async function GET() {
	const users = await db.user.findMany({
		select: {
			id: true,
			name: true,
			username: true,
			email: true,
		},
	})

	return NextResponse.json(users);
}
