"use client";
import Link from "next/link";
import { Input, Label, SpanError } from "@/components/ui";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function FormLogin() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const router = useRouter();
	const [error, setError] = useState(null);

	const onSubmit = handleSubmit(async (data) => {
		const res = await signIn("credentials", {
			email: data.email,
			password: data.password,
			remember: data.rememberMe,
			redirect: false,
		});
		if (res.error) {
			setError(res.error);
		} else {
			router.push("/");
			router.refresh();
		}
	});

	return (
		<form className="mt-8 space-y-6" onSubmit={onSubmit}>
			{error && (
				<div className="animate-slide-in-from-right fixed right-4 top-[5.5rem] z-50 rounded-md bg-[#ff69b4]/60 px-6 py-3 duration-500">
					<span className="text-sm font-medium text-white">{error}</span>
				</div>
			)}
			<div className="text-center">
				<h2 className="mt-6 text-4xl font-bold text-white">
					Inicia sesión en <span className="text-[#00ffff]">Code</span>
					<span className="text-[#ff69b4]">Speak</span>
				</h2>
				<p className="mt-2 text-base text-gray-300">
					Continúa tu viaje de aprendizaje y desarrollo
				</p>
			</div>
			<div className="space-y-4">
				<div>
					<Label htmlFor="email">Correo electrónico</Label>
					<Input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						placeholder="tu@ejemplo.com"
						{...register("email", {
							required: {
								value: true,
								message: "El email es obligatorio",
							},
						})}
					/>
					{errors.email && <SpanError>{errors.email.message}</SpanError>}
				</div>
				<div>
					<Label htmlFor="password">Contraseña</Label>
					<Input
						id="password"
						name="password"
						type="password"
						autoComplete="current-password"
						placeholder="••••••••"
						{...register("password", {
							required: {
								value: true,
								message: "La contraseña es obligatoria",
							},
						})}
					/>
					{errors.password && <SpanError>{errors.password.message}</SpanError>}
				</div>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<input
						id="rememberMe"
						name="rememberMe"
						type="checkbox"
						defaultChecked={true}
						className="ml-[0.05rem] h-4 w-4 rounded border-gray-600 bg-gray-700 text-[#00ffff] focus:ring-[#00ffff]"
						{...register("rememberMe")}
					/>
					<label
						htmlFor="rememberMe"
						className="ml-2 block text-sm text-gray-300"
					>
						Recuérdame
					</label>
				</div>

				<div className="text-sm">
					<Link
						href="#"
						className="font-medium text-[#00ffff] hover:text-[#00cccc]"
					>
						¿Olvidaste tu contraseña?
					</Link>
				</div>
			</div>

			<div>
				<button
					type="submit"
					className="flex w-full justify-center rounded-md bg-gradient-to-r from-[#00ffff] to-[#ff69b4] px-4 py-3 text-sm font-medium text-white shadow-sm transition duration-200 hover:from-[#00cccc] hover:to-[#ff4499] active:scale-95"
				>
					Iniciar sesión
				</button>
			</div>
		</form>
	);
}

export default FormLogin;
