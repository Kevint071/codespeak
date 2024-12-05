"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/validations/registerSchema";
import { EmailInput, DataUserInput, PasswordInput } from "@/components/auth";

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
		<form className="flex flex-col gap-12" onSubmit={onSubmit} noValidate>
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
			<div className="flex flex-col gap-4">
				<div className="flex max-sm:flex-col gap-4">
					{/* <NameInput
						register={register("name")}
						error={errors.name}
					/> */}
					<DataUserInput
						label="Nombre y Apellido"
						id="name"
						placeholder="James Smith"
						register={register("name")}
						error={errors.name}
						maxLength={40} // Personaliza la longitud máxima si es necesario
					/>

					{/* Campo Nombre de Usuario */}
					<DataUserInput
						label="Nombre de Usuario"
						id="username"
						placeholder="Jamess071"
						register={register("username")}
						error={errors.username}
						maxLength={20} // Diferente longitud máxima
					/>

					{/* <div>
						<Label htmlFor="lastname">Nombre de Usuario</Label>
						<Input
							id="username"
							type="text"
							placeholder="Jamess071"
							data-testid="username"
							{...register("username")}
						/>
						{errors.username && (
							<MessageError data-testid="username-error">
								{errors.username.message}
							</MessageError>
						)}
					</div> */}
				</div>
				<EmailInput register={register("email")} error={errors.email} />

				<div className="flex max-sm:flex-col gap-4">
					<PasswordInput
						id="password"
						label="Contraseña"
						register={register("password", {required: true})}
						error={errors.password}
					/>

					{/* Campo Confirmar Contraseña */}
					<PasswordInput
						id="confirmPassword"
						label="Confirmar contraseña"
						register={register("confirmPassword", {required: true})}
						error={errors.confirmPassword}
					/>
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
