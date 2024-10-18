import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import {NEXTAUTH_SECRET} from '@/lib/config'
import bcrypt from "bcrypt";

export const authOptions = {
	// Proveedor de autenticación con credenciales personalizadas
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "email",
					type: "email",
					placeholder: "example@email.com",
				password: {
					label: "password",
					type: "password",
					placeholder: "**********",
				},
			},
			// Función que autoriza al usuario usando las credenciales proporcionadas
			async authorize(credentials, req) {
				// Busca al usuario en la base de datos por su email
				const userFound = await db.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				// Si el usuario no existe, lanza un error
				if (!userFound) throw new Error("Usuario o contraseña incorrecta");

				// Verifica la contraseña usando bcrypt
				const matchPassword = await bcrypt.compare(
					credentials.password,
					userFound.password,
				);
				// Si la contraseña no coincide, lanza un error
				if (!matchPassword) throw new Error("Usuario o contraseña incorrecta");

				// Devuelve el objeto usuario sin la contraseña
				const { password: _, ...user } = userFound;
				return user;
			},
		}),
	],

	// Callbacks para manipular los tokens y la sesión del usuario
	callbacks: {
		// Añade la información del usuario al token JWT
		jwt({ token, user }) {
			if (user) {
				token.user = user; // Almacena el usuario en el token
			}
			return token; // Devuelve el token actualizado
		},
		// Añade la información del token a la sesión del usuario
		session({ session, token }) {
			session.user = token.user; // Almacena el usuario en la sesión
			return session; // Devuelve la sesión actualizada
		},
	},

	// Define la página personalizada para el inicio de sesión
	pages: {
		signIn: "/auth/login", // Redirige a esta página en caso de que el usuario necesite iniciar sesión
	},

	// Configura la sesión con JWT y define la duración de la sesión
	session: {
		jwt: true, // Usa JWT para la sesión
		maxAge: 35 * 24 * 60 * 60, // Duración de la sesión: 35 días
	},

	// Secreto utilizado para firmar los tokens JWT
	secret: NEXTAUTH_SECRET,
};
