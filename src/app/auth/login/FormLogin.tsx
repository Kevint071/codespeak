"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginSchema } from "@/validations/loginSchema";
import type { z } from "zod";
import { EmailInput, PasswordInput} from "@/components/auth";

// Define la estructura de los datos
type FormLoginInputs = z.infer<typeof loginSchema>;

function FormLogin(): JSX.Element {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormLoginInputs>({
		resolver: zodResolver(loginSchema),
	});

	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	const onSubmit = handleSubmit(async (data: FormLoginInputs) => {
		const res = await signIn("credentials", {
			email: data.email,
			password: data.password,
			remember: data.rememberMe,
			redirect: false,
		});

		if (res?.error) {
			setError(res.error);
		} else {
			router.push("/");
			router.refresh();
		}
	});

	return (
		<form className="flex flex-col gap-y-6" onSubmit={onSubmit} noValidate>
			{error && (
				<div className="fixed right-4 top-[5.5rem] z-50 animate-slide-in-from-right rounded-md bg-[#ff69b4]/60 px-6 py-3 duration-500">
					<span className="text-sm font-medium text-white">
						{error}
					</span>
				</div>
			)}

			<div className="text-center">
				<h2 className="mt-6 text-4xl font-bold text-white">
					Inicia sesión en{" "}
					<span className="text-[#00ffff]">Code</span>
					<span className="text-[#ff69b4]">Speak</span>
				</h2>
				<p className="mt-2 text-base text-gray-300">
					Continúa tu viaje de aprendizaje y desarrollo
				</p>
			</div>

			<div className="space-y-4">
      <EmailInput register={register("email")} error={errors.email} />

      <PasswordInput
						id="password"
						label="Contraseña"
						register={register("password", {required: true})}
						error={errors.password}
					/>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<input
						id="rememberMe"
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
