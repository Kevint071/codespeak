"use client";
import { useForm } from "react-hook-form";
import { Input, Label, SpanError } from "@/components/ui";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/validations/registerSchema";

interface FormInputs {
	name: string;
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

function FormSignUp(): JSX.Element {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInputs>({
		resolver: zodResolver(registerSchema),
	});
	const router = useRouter();

	const onSubmit = handleSubmit(async (data: FormInputs): Promise<void> => {
		if (data.password !== data.confirmPassword) {
			return;
		}

		const res = await fetch("/api/auth/register", {
			method: "POST",
			body: JSON.stringify({
				name: data.name,
				username: data.username,
				email: data.email,
				password: data.password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
			router.push("/auth/login");
		}
	});

	return (
		<form className="mt-8 space-y-6" onSubmit={onSubmit} noValidate>
			<div className="text-center">
				<h2 className="mt-6 text-4xl font-bold text-white">
					Únete a <span className="text-[#00ffff]">Code</span>
					<span className="text-[#ff69b4]">Speak</span>
				</h2>
				<p className="mt-2 text-base text-gray-400">
					Empieza tu viaje para dominar el código y llevar tu carrera
					al siguiente nivel
				</p>
			</div>
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<Label
							htmlFor="name"
							className="block text-sm font-medium text-gray-300"
						>
							Nombre y Apellido
						</Label>
						<Input
							id="name"
							type="text"
							placeholder="James Smith"
							data-testid="name"
							{...register("name")}
						/>
						{errors.name && (
							<SpanError data-testid="name-error">
								{errors.name.message}
							</SpanError>
						)}
					</div>
					<div>
						<Label
							htmlFor="lastname"
							className="block text-sm font-medium text-gray-300"
						>
							Nombre de Usuario
						</Label>
						<Input
							id="username"
							type="text"
							placeholder="Jamess071"
							data-testid="username"
							{...register("username")}
						/>
						{errors.username && (
							<SpanError data-testid="username-error">
								{errors.username.message}
							</SpanError>
						)}
					</div>
				</div>
				<div>
					<Label
						htmlFor="email"
						className="block text-sm font-medium text-gray-300"
					>
						Correo electrónico
					</Label>
					<Input
						id="email"
						type="email"
						autoComplete="email"
						placeholder="tu@ejemplo.com"
						data-testid="email"
						{...register("email")}
					/>
					{errors.email && (
						<SpanError data-testid="email-error">
							{errors.email.message}
						</SpanError>
					)}
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<Label
							htmlFor="password"
							className="block text-sm font-bold text-gray-300"
						>
							Contraseña
						</Label>
						<Input
							id="password"
							type="password"
							autoComplete="new-password"
							placeholder="••••••••"
							data-testid="password"
							{...register("password", {
								required: {
									value: true,
									message: "La contraseña es obligatoria",
								},
							})}
						/>
						{errors.password && (
							<SpanError data-testid="password-error">
								{errors.password.message}
							</SpanError>
						)}
					</div>
					<div>
						<Label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-gray-300"
						>
							Confirmar contraseña
						</Label>
						<Input
							id="confirmPassword"
							type="password"
							autoComplete="new-password"
							placeholder="••••••••"
							data-testid="confirmPassword"
							{...register("confirmPassword", {
								required: {
									value: true,
									message: "La contraseña es obligatoria",
								},
							})}
						/>
						{errors.confirmPassword && (
							<SpanError data-testid="confirmPassword-error">
								{errors.confirmPassword.message}
							</SpanError>
						)}
					</div>
				</div>
			</div>

			<div>
				<button
					type="submit"
					data-testid="submit-button"
					className="flex w-full justify-center rounded-md bg-gradient-to-r from-[#00ffff] to-[#ff69b4] px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-[#00cccc] hover:to-[#ff4499] focus:outline-none focus:ring-2 focus:ring-[#00ffff] focus:ring-offset-2"
				>
					Registrarse
				</button>
			</div>
		</form>
	);
}

export default FormSignUp;
