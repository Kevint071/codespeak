import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";

export async function POST(request) {
  try {
    const data = await request.json();

    const usernameFound = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (usernameFound) {
      return NextResponse.json(
        { message: "El usuario ya existe" },
        { status: 400 },
      );
    }

    const emailFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (emailFound) {
      return NextResponse.json(
        { message: "El email ya existe" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await db.user.create({
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Error al crear el usuario" },
      { status: 500 },
    );
  }
}
