import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function PUT(request, { params }) {
	try {
		const data = await request.json();
		const userID = Number(params.userID);

		if (Number.isNaN(userID)) {
			return NextResponse.json(
				{ error: "ID de usuario inválido" },
				{ status: 400 },
			);
		}

		if (data.newPassword !== data.confirmPassword) {
			return NextResponse.json(
				{ error: "Las contraseñas no coinciden" },
				{ status: 400 },
			);
		}

		const userFound = await db.user.findUnique({
			where: { id: userID },
		});

		if (!userFound) {
			return NextResponse.json(
				{ error: "Usuario no encontrado" },
				{ status: 404 },
			);
		}

		const matchPassword = await bcrypt.compare(
			data.password,
			userFound.password,
		);

		if (!matchPassword) {
			return NextResponse.json(
				{ error: "La contraseña actual es incorrecta" },
				{ status: 400 },
			);
		}

		const hashPassword = await bcrypt.hash(data.newPassword, 10);

		const updatedUser = await db.user.update({
			where: { id: userID },
			data: {
				password: hashPassword,
			},
		});

		return NextResponse.json(
			{ message: "Contraseña actualizada con éxito" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error al cambiar la contraseña:", error);
		return NextResponse.json({ error: error }, { status: 500 });
	}
}

export async function DELETE(request, { params }) {
	try {
		const userID = Number(params.userID);
		if (Number.isNaN(userID)) {
			return NextResponse.json(
				{ error: "ID de usuario inválido" },
				{ status: 400 },
			);
		}

		const body = await request.json();
		const { password } = body;

		if (!password) {
			return NextResponse.json(
				{ error: "La contraseña es requerida" },
				{ status: 400 },
			);
		}

		const userFound = await db.user.findUnique({
			where: { id: userID },
		});

		if (!userFound) {
			return NextResponse.json(
				{ error: "Usuario no encontrado" },
				{ status: 404 },
			);
		}

		if (!userFound.password) {
			return NextResponse.json(
				{ error: "Error en la autenticación del usuario" },
				{ status: 500 },
			);
		}

		const matchPassword = await bcrypt.compare(password, userFound.password);

		if (!matchPassword) {
			return NextResponse.json(
				{ error: "La contraseña es incorrecta" },
				{ status: 400 },
			);
		}

		// Eliminar registros relacionados
		await db.$transaction([
			db.userInterest.deleteMany({ where: { userId: userID } }),
			// Agrega aquí más operaciones de eliminación para otras tablas relacionadas si es necesario
			db.user.delete({ where: { id: userID } }),
		]);

		return NextResponse.json(
			{ message: "Cuenta eliminada con éxito" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error al eliminar la cuenta:", error);
		return NextResponse.json(
			{ error: "Error interno del servidor" },
			{ status: 500 },
		);
	}
}
