import React, { useState } from "react";
import { Lock, Trash2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function AccountSettings() {
	const [modalType, setModalType] = useState(null);

	const params = useParams();
	const userID = params.userID;

	const handleChangePassword = () => {
		setModalType("password");
	};

	const handleDeleteAccount = () => {
		setModalType("delete");
	};

	return (
		<div className="mx-auto min-h-[calc(100vh-5rem)] w-full max-w-4xl px-4 py-8">
			<div className="rounded-lg bg-gradient-to-br from-gray-900 to-black p-4 text-white shadow-xl sm:p-6">
				<h1 className="mb-6 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
					Configuración de la Cuenta
				</h1>
				<div className="space-y-6">
					<SettingItem
						icon={
							<Lock className="h-6 w-6 flex-shrink-0 text-cyan-400" />
						}
						title="Cambiar Contraseña"
						description="Actualiza tu contraseña para mantener tu cuenta segura"
						action={
							<button
								type="button"
								onClick={handleChangePassword}
								className="mt-2 rounded-md bg-cyan-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-cyan-600 sm:mt-0"
							>
								Cambiar
							</button>
						}
					/>
					<SettingItem
						icon={
							<Trash2 className="h-6 w-6 flex-shrink-0 text-pink-400" />
						}
						title="Eliminar Cuenta"
						description="Elimina permanentemente tu cuenta y todos tus datos"
						action={
							<button
								type="button"
								onClick={handleDeleteAccount}
								className="mt-2 rounded-md bg-pink-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-pink-600 sm:mt-0"
							>
								Eliminar
							</button>
						}
					/>
				</div>
			</div>
			{modalType === "password" && (
				<PasswordChangeModal
					onClose={() => setModalType(null)}
					userID={userID}
				/>
			)}

			{modalType === "delete" && (
				<DeleteAccountModal onClose={() => setModalType(null)} />
			)}
		</div>
	);
}

function SettingItem({ icon, title, description, action }) {
	return (
		<div className="flex flex-col justify-between gap-x-5 rounded-lg bg-gray-800 bg-opacity-50 p-4 transition-colors duration-200 hover:bg-opacity-70 sm:flex-row sm:items-center">
			<div className="mb-2 flex items-start space-x-4 sm:mb-0 sm:items-center">
				{icon}
				<div>
					<h2 className="text-lg font-medium">{title}</h2>
					<p className="text-sm text-gray-400">{description}</p>
				</div>
			</div>
			{action}
		</div>
	);
}

function PasswordChangeModal({ onClose, userID }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();
	const [status, setStatus] = useState(null);

	const onSubmit = async (data) => {
		try {
			const res = await fetch(`/api/profile/settings/${userID}`, {
				method: "PUT",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const responseData = await res.json();

			if (res.ok) {
				setStatus({
					type: "success",
					message: "Contraseña actualizada con éxito",
				});
				setTimeout(() => {
					onClose();
				}, 1000);
			} else {
				setStatus({
					type: "error",
					message:
						responseData.error ||
						"Ocurrió un error al cambiar la contraseña",
				});
			}
		} catch (error) {
			console.error("Error al enviar la solicitud", error);
			setStatus({
				type: "error",
				message: "Ocurrió un error al procesar la solicitud",
			});
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
			{status && (
				<div
					className={`fixed right-4 top-20 z-50 animate-slide-in-from-right rounded-md px-6 py-3 text-white ${
						status.type === "success"
							? "bg-green-500/60"
							: "bg-pink-500/60"
					}`}
				>
					<span className="text-sm font-medium">
						{status.message}
					</span>
				</div>
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full max-w-md rounded-lg bg-gray-900 p-6 text-base"
			>
				<div className="mb-6 flex items-center justify-between">
					<h2 className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-2xl font-bold text-transparent">
						Cambiar Contraseña
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="text-gray-400 transition-colors hover:text-white"
					>
						<X size={24} />
					</button>
				</div>

				<div className="mb-4">
					<input
						type="password"
						placeholder="Contraseña actual"
						className="w-full rounded border border-gray-700 bg-gray-800 p-3 text-white focus:border-cyan-500 focus:outline-none"
						{...register("password", {
							required: "La contraseña actual es obligatoria",
							minLength: {
								value: 8,
								message:
									"La contraseña debe tener al menos 8 caracteres",
							},
						})}
					/>
					{errors.password && (
						<span className="mt-1 block text-xs text-pink-500">
							{errors.password.message}
						</span>
					)}
				</div>

				<div className="mb-4">
					<input
						type="password"
						placeholder="Nueva contraseña"
						className="w-full rounded border border-gray-700 bg-gray-800 p-3 text-white focus:border-cyan-500 focus:outline-none"
						{...register("newPassword", {
							required: "La nueva contraseña es obligatoria",
							minLength: {
								value: 8,
								message:
									"La contraseña debe tener al menos 8 caracteres",
							},
						})}
					/>
					{errors.newPassword && (
						<span className="mt-1 block text-xs text-pink-500">
							{errors.newPassword.message}
						</span>
					)}
				</div>

				<div className="mb-4">
					<input
						type="password"
						placeholder="Confirmar nueva contraseña"
						className="w-full rounded border border-gray-700 bg-gray-800 p-3 text-white focus:border-cyan-500 focus:outline-none"
						{...register("confirmPassword", {
							required: "Confirma la nueva contraseña",
							validate: (value) =>
								value === watch("newPassword") ||
								"Las contraseñas no coinciden",
						})}
					/>
					{errors.confirmPassword && (
						<span className="mt-1 block text-xs text-pink-500">
							{errors.confirmPassword.message}
						</span>
					)}
				</div>

				<div className="mt-6 flex justify-end space-x-4">
					<button
						type="button"
						onClick={onClose}
						className="rounded-md bg-gray-700 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-600"
					>
						Cancelar
					</button>
					<button
						type="submit"
						className="rounded-md bg-gradient-to-r from-pink-500 to-cyan-500 px-4 py-2 text-white transition-colors duration-200 hover:from-pink-600 hover:to-cyan-600"
					>
						Guardar
					</button>
				</div>
			</form>
		</div>
	);
}

function DeleteAccountModal({ onClose }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [status, setStatus] = useState(null);
	const router = useRouter();
	const params = useParams();
	const userID = params.userID;

	const onSubmit = async (data) => {
		try {
			const res = await fetch(`/api/profile/settings/${userID}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ password: data.password }),
			});

			const responseData = await res.json();

			if (res.ok) {
				setStatus({
					type: "success",
					message: "Cuenta eliminada con éxito",
				});

				setTimeout(async () => {
					await signOut({ redirect: false });
					router.push("/");
				}, 1000);
			} else {
				setStatus({
					type: "error",
					message:
						responseData.error ||
						"Ocurrió un error al eliminar la cuenta",
				});
			}
		} catch (error) {
			console.error("Error al enviar la solicitud", error);
			setStatus({
				type: "error",
				message: "Ocurrió un error al procesar la solicitud",
			});
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
			{status && (
				<div
					className={`fixed right-4 top-20 z-50 animate-slide-in-from-right rounded-md px-6 py-3 text-white ${
						status.type === "success"
							? "bg-green-500/60"
							: "bg-pink-500/60"
					}`}
				>
					<span className="text-sm font-medium">
						{status.message}
					</span>
				</div>
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full max-w-md rounded-lg bg-gray-800 p-6"
			>
				<h2 className="mb-4 text-xl font-bold">Eliminar Cuenta</h2>
				<p className="mb-4">
					¿Estás seguro de que quieres eliminar tu cuenta? Esta acción
					no se puede deshacer.
				</p>
				<input
					type="password"
					placeholder="Ingresa tu contraseña para confirmar"
					className="mb-4 w-full rounded bg-gray-700 p-2 text-white"
					{...register("password", {
						required: "La contraseña es requerida",
					})}
				/>
				{errors.password && (
					<p className="mb-2 text-sm text-red-500">
						{errors.password.message}
					</p>
				)}
				<div className="flex justify-end space-x-4">
					<button
						type="button"
						onClick={onClose}
						className="rounded-md bg-gray-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700"
					>
						Cancelar
					</button>
					<button
						type="submit"
						className="rounded-md bg-pink-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-pink-600"
					>
						Eliminar Cuenta
					</button>
				</div>
			</form>
		</div>
	);
}
