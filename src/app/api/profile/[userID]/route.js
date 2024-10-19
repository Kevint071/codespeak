import { NextResponse } from "next/server";
import db from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";
import { CLOUD_NAME, API_KEY, API_SECRET } from "@/lib/config";

cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: API_KEY,
	api_secret: API_SECRET,
});

const uploadImage = async (imageFile) => {
	const arrayBuffer = await imageFile.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	return new Promise((resolve, reject) => {
		cloudinary.uploader
			.upload_stream((error, result) => {
				if (error) reject(error);
				else resolve(result.secure_url);
			})
			.end(buffer);
	});
};

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
			where: { id: userID },
			include: { interests: { include: { interest: true } } },
		});

		if (!user) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json(user);
	} catch (error) {
		console.error("Error fetching user:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export async function PUT(request, { params }) {
	try {
		const userID = Number(params.userID);
		if (Number.isNaN(userID)) {
			return NextResponse.json(
				{ error: "Invalid user ID" },
				{ status: 400 },
			);
		}

		const formData = await request.formData();
		const fields = ["name", "username", "gender", "birthdate", "aboutMe"];
		const data = {};

		for (const field of fields) {
			data[field] = formData.get(field) || "";
		}

		const imageFile = formData.get("imageFile");
		const interests = JSON.parse(formData.get("interests") || "[]");

		// Subir imagen si se proporciona
		if (imageFile && imageFile instanceof File) { 
			data.imageProfile = await uploadImage(imageFile);
		} else if (imageFile === "null") {
			data.imageProfile = null;
		}

		// Transacción para actualizar usuario e intereses
		const updatedUser = await db.$transaction(async (prisma) => {
			// Actualizar datos de usuario
			const user = await prisma.user.update({
				where: { id: userID },
				data: {
					...data,
					birthdate: data.birthdate ? new Date(data.birthdate) : null,
				},
			});

			// Eliminar todos los intereses existentes
			await prisma.userInterest.deleteMany({ where: { userId: userID } });

			if (interests.length > 0) {
				// Obtener o crear intereses
				const interestRecords = await Promise.all(
					interests.map(async (name) => {
						let interest = await prisma.interest.findFirst({
							where: { name },
						});
						if (!interest) {
							interest = await prisma.interest.create({
								data: { name },
							});
						}
						return interest;
					}),
				);

				// Crear nuevas relaciones usuario-interés
				await Promise.all(
					interestRecords.map((interest) =>
						prisma.userInterest.create({
							data: { userId: userID, interestId: interest.id },
						}),
					),
				);
			}

			// Obtener el usuario actualizado con los intereses
			return prisma.user.findUnique({
				where: { id: userID },
				include: { interests: { include: { interest: true } } },
			});
		});

		console.log("updatedUser", updatedUser);

		return NextResponse.json(updatedUser);
	} catch (error) {
		console.error("Error updating user:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
