import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import {NEXTAUTH_SECRET} from '@/lib/config'
import bcrypt from "bcrypt";

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "email",
					type: "email",
					placeholder: "example@email.com",
				},
				password: {
					label: "password",
					type: "password",
					placeholder: "**********",
				},
			},
			async authorize(credentials, req) {

				const userFound = await db.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!userFound) throw new Error("Usuario o contraseña incorrecta");

				const matchPassword = await bcrypt.compare(
					credentials.password,
					userFound.password,
				);
				if (!matchPassword) throw new Error("Usuario o contraseña incorrecta");
				const { password: _, ...user } = userFound;
				return user;
			},
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.user = user;
			}
			return token;
		},
		session({ session, token }) {
			session.user = token.user;
			return session;
		},
	},
	pages: {
		signIn: "/auth/login",
	},
	session: {
		jwt: true,
		maxAge: 35 * 24 * 60 * 60,
	},
	secret: NEXTAUTH_SECRET,
};
