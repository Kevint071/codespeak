import { NextResponse } from "next/server";
import db from '@/lib/db';

export async function GET(request, { params }) {
    try {
		const userID = Number(params.userID);
		if (Number.isNaN(userID)) {
			return NextResponse.json(
				{ error: "Invalid user ID" },
				{ status: 400 },
			);
		}

		const user = await db.user.findUnique({
			where: { id: userID }
		});

		if (!user) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 },
			);
		}

		const {password: _, ...userData} = user;

		return NextResponse.json(userData);
	} catch (error) {
		console.error("Error fetching user:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}