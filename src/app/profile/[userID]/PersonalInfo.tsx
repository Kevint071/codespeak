"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, mappedGenders } from "@/validations/userSchema";
import { useParams } from "next/navigation";
import { X, ImagePlus } from "lucide-react";
import { Input } from "@/components/ui";

type Inputs = {
	name: string;
	username: string;
	gender: string;
	birthdate: string | null;
	aboutMe: string | null;
};

type Interest = {
	id: number;
	name: string;
};

interface ProfileData extends Inputs {
	imageProfile: string | null;
	interests: Array<{ interest: { id: number; name: string } }>;
}

function PersonalInfo() {
	// Obtiene el parámetro 'userID' de la URL actual
	const params = useParams();

	// Estado para manejar intereses, modo edición, y estado de actualización
	const [interests, setInterests] = useState<Interest[]>([]);
	const [isEditing, setIsEditing] = useState<boolean>(false); // Si se está editando o no
	const [datosActualizados, setDatosActualizado] = useState<boolean>(true); // Indica si los datos han sido actualizados

	// Estado para manejar la imagen de perfil
	const [imageFile, setImageFile] = useState<File | null>(null); // Archivo de la imagen seleccionada
	const [imageProfileUrl, setImageProfileUrl] = useState<string | null>(null); // URL temporal para previsualizar la imagen
	const [imagenActual, setImagenActual] = useState<string | null>(
		imageProfileUrl,
	); // Mantiene la URL actual de la imagen

	// Inicializa el formulario con valores por defecto
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: zodResolver(userSchema),
	});

	const gendersOptions = Object.entries(mappedGenders).map(([key, value]) => (
		<option
			className="bg-gray-800 text-sm text-gray-200"
			key={key}
			value={key}
		>
			{value}
		</option>
	));

	console.log(errors);

	// Agrega un nuevo interés si no existe en la lista
	const addInterest = useCallback(
		(interestName: string) => {
			if (
				interestName &&
				!interests.some((interest) => interest.name === interestName)
			) {
				setInterests((prevInterests) => [
					...prevInterests,
					{ id: Date.now(), name: interestName }, // Genera un ID único
				]);
				setDatosActualizado(false); // Indica que hay cambios no guardados
			}
		},
		[interests],
	);

	// Elimina un interés de la lista por su ID
	const removeInterest = useCallback((id: number) => {
		setInterests((prevInterests) =>
			prevInterests.filter((interest) => interest.id !== id),
		);
		setDatosActualizado(false); // Marca que hay cambios pendientes
	}, []);

	// Llama a la API para obtener los datos del perfil y los asigna al formulario
	const fetchProfile = useCallback(async () => {
		try {
			const response = await fetch(`/api/profile/${params.userID}`);
			const data: ProfileData = await response.json();
			if (data.birthdate) {
				const formattedDate = data.birthdate.split("T")[0]; // Formatea la fecha de nacimiento
				setValue("birthdate", formattedDate);
			}
			if (data) {
				// Rellena los campos del formulario con los datos del perfil
				setValue("name", data.name);
				setValue("username", data.username);
				setValue("gender", data.gender);
				setValue("aboutMe", data.aboutMe);
				setImageProfileUrl(data.imageProfile ?? null);
				setImagenActual(data.imageProfile ?? null); // Establece la imagen actual
				// Mapea intereses a la estructura local
				setInterests(
					data.interests.map((ui) => ({
						id: ui.interest.id,
						name: ui.interest.name,
					})),
				);
			}
		} catch (error) {
			console.error("Error al obtener perfil", error);
		}
	}, [params.userID, setValue]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Efecto que se ejecuta solo una vez para cargar el perfil al montar el componente
	useEffect(() => {
		fetchProfile();
	}, []);

	// Maneja la lógica de envío del formulario, incluyendo la actualización del perfil
	const onSubmit: SubmitHandler<Inputs> = async (datos) => {
		try {
			const formData = new FormData();
			console.log(datos);
			// Añade los datos del formulario al objeto FormData
			formData.append("name", datos.name);
			formData.append("username", datos.username);
			formData.append("gender", datos.gender || "");
			formData.append("aboutMe", datos.aboutMe || "");
			formData.append(
				"interests",
				JSON.stringify(interests.map((interest) => interest.name)),
			);
			// Solo agrega la imagen si ha cambiado
			if (imageProfileUrl == null || imageProfileUrl.startsWith("blob")) {
				formData.append("imageFile", imageFile as Blob);
			} else {
				formData.append("imageFile", "");
			}
			// Agrega la fecha de nacimiento si está presente
			if (datos.birthdate) {
				formData.append("birthdate", datos.birthdate);
			} else {
				formData.append("birthdate", "");
			}

			// Llama a la API para actualizar el perfil del usuario
			const response = await fetch(`/api/profile/${params.userID}`, {
				method: "PUT",
				body: formData,
			});

			const result = await response.json();

			if (response.ok) {
				console.log("Perfil actualizado con éxito");
				setDatosActualizado(true); // Marca que los datos están actualizados
				setIsEditing(false); // Salir del modo de edición
				await fetchProfile(); // Vuelve a cargar el perfil con los últimos datos
				if (imagenActual !== imageProfileUrl) {
					setImagenActual(imageProfileUrl);
					window.location.reload(); // Recarga la página si la imagen cambia
				}
			} else {
				console.error("Error al actualizar perfil", result);
			}
		} catch (error) {
			console.error("Error al actualizar perfil", error);
		}
	};

	// Ref para el input de archivos (imagen de perfil)
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Maneja la interacción para subir una nueva imagen de perfil
	const handleInteraction = () => {
		if (isEditing && fileInputRef.current) {
			fileInputRef.current.click(); // Simula un clic en el input de archivos
		}
	};

	// Manejador para cambiar la imagen de perfil seleccionada
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			const file = e.target.files[0];
			setImageFile(file); // Establece el archivo de imagen
			const objectUrl = URL.createObjectURL(file); // Crea una URL temporal para previsualización
			setImageProfileUrl(objectUrl); // Muestra la imagen seleccionada
		}
	};

	// Manejador para eliminar la foto de perfil actual
	const handleDeletePhoto = () => {
		setImageProfileUrl(null); // Elimina la URL de la imagen
		setImageFile(null); // Limpia el archivo seleccionado
		if (fileInputRef.current) {
			fileInputRef.current.value = ""; // Limpia el input de archivos
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-h-fit min-h-[calc(100vh-5rem)] rounded-lg bg-gradient-to-br from-gray-900 to-black p-4 text-white shadow-xl md:p-8"
		>
			<div>
				<div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
					<h2 className="mb-4 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-2xl font-bold text-transparent md:mb-0 md:text-3xl">
						Información Personal
					</h2>
					<button
						onClick={() => {
							setIsEditing(true);
							setDatosActualizado(false);
						}}
						type="button"
						className="text-base font-semibold text-pink-400 transition-colors duration-200 hover:text-pink-300 md:text-lg"
					>
						Editar Datos
					</button>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
					{/* Avatar user */}
					<div className="col-span-1 flex flex-col items-center justify-center md:col-span-2 lg:col-span-1">
						<button
							className="group relative my-4 h-48 w-48 transform overflow-hidden rounded-full transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:hover:scale-100 md:my-6 md:h-56 md:w-56 lg:h-64 lg:w-64"
							onClick={handleInteraction}
							disabled={!isEditing}
							aria-label="Subir imagen de perfil"
							type="button"
						>
							<div
								className={`absolute inset-0 ${imageProfileUrl ? "" : "bg-gradient-to-br from-cyan-400 to-pink-500"}`}
							>
								{imageProfileUrl && (
									<img
										src={imageProfileUrl}
										alt="Profile"
										className="h-full w-full object-cover"
									/>
								)}
							</div>
							{!imageProfileUrl && (
								<div className="absolute inset-0 flex items-center justify-center">
									<ImagePlus className="h-16 w-16 text-white opacity-50 transition-opacity group-hover:opacity-80 group-disabled:group-hover:opacity-50 md:h-20 md:w-20" />
								</div>
							)}
						</button>
						<input
							ref={fileInputRef}
							type="file"
							className="hidden"
							onChange={handleFileChange}
							accept="image/*"
						/>
						{imageProfileUrl && isEditing && (
							<div className="mt-4 flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
								<button
									type="button"
									onClick={handleInteraction}
									className="rounded-md bg-cyan-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
								>
									Cambiar foto
								</button>
								<button
									type="button"
									onClick={handleDeletePhoto}
									className="rounded-md bg-pink-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
								>
									Eliminar foto
								</button>
							</div>
						)}
					</div>
					{/* Resto del formulario */}
					<div className="col-span-1 space-y-4 md:col-span-2 md:space-y-6 lg:col-span-1">
						<div>
							<label
								htmlFor="name"
								className="mb-2 block text-sm font-medium text-gray-300"
							>
								Nombre y Apellido:
							</label>
							<Input
								id="name"
								className="border-gray-700 bg-gray-800 text-white focus:border-cyan-400 focus:ring-cyan-400"
								{...register("name", { required: true })}
								readOnly={!isEditing}
							/>
							{errors.name?.message && (
								<p className="my-1 px-1 text-xs font-bold text-red-500">
									{errors.name.message}
								</p>
							)}
						</div>
						<div>
							<label
								htmlFor="username"
								className="mb-2 block text-sm font-medium text-gray-300"
							>
								Nombre de usuario:
							</label>
							<Input
								id="username"
								className="border-gray-700 bg-gray-800 text-white focus:border-cyan-400 focus:ring-cyan-400"
								{...register("username", {
									required: true,
								})}
								readOnly={!isEditing}
							/>
							{errors.username?.message && (
								<p className="my-1 px-1 text-xs font-bold text-red-500">
									{errors.username.message}
								</p>
							)}
						</div>
						<div>
							<label
								htmlFor="gender"
								className="mb-2 block text-sm font-medium text-gray-300"
							>
								Género:
							</label>
							<select
								id="gender"
								className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
								disabled={!isEditing}
								{...register("gender")}
							>
								{gendersOptions}
							</select>
						</div>
						<div>
							<label
								htmlFor="birthdate"
								className="mb-2 block text-sm font-medium text-gray-300"
							>
								Cumpleaños:
							</label>
							<Input
								id="birthdate"
								type="date"
								className="border-gray-700 bg-gray-800 text-white focus:border-cyan-400 focus:ring-cyan-400"
								{...register("birthdate")}
								readOnly={!isEditing}
							/>
							{errors.birthdate?.message && (
								<p className="my-1 px-1 text-xs font-bold text-red-500">
									{errors.birthdate.message}
								</p>
							)}
						</div>
					</div>
					<div className="col-span-1 md:col-span-2">
						<label
							htmlFor="aboutMe"
							className="mb-2 block text-sm font-medium text-gray-300"
						>
							Cuéntanos sobre ti:
						</label>
						<textarea
							id="aboutMe"
							rows={4}
							className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
							{...register("aboutMe")}
							readOnly={!isEditing}
						/>
						{errors.aboutMe?.message && (
							<p className="my-1 px-1 text-xs font-bold text-red-500">
								{errors.aboutMe.message}
							</p>
						)}
					</div>
				</div>

				{/* AREA INTRES */}
				<div className="col-span-1 mt-6 space-y-4 md:col-span-2 md:mt-8">
					<h3 className="text-xl font-semibold text-gray-300">
						Áreas de interés:
					</h3>
					<div className="flex flex-wrap gap-2">
						{interests.map((interest) => (
							<span
								key={interest.id}
								className="flex items-center rounded-full bg-gradient-to-r from-cyan-600 to-pink-600 px-3 py-1 text-sm text-white"
							>
								{interest.name}
								<X
									className={`ml-1 cursor-pointer text-white hover:text-gray-200 ${!isEditing ? "hidden" : ""}`}
									size={16}
									onClick={() => removeInterest(interest.id)}
								/>
							</span>
						))}
					</div>
					<div className="flex flex-col gap-2 md:flex-row">
						<Input
							placeholder="Añadir interés"
							className={`flex-grow border-gray-700 bg-gray-800 text-white focus:border-cyan-400 focus:ring-cyan-400 ${!isEditing ? "hidden" : ""}`}
							readOnly={!isEditing}
							onKeyDown={(
								e: React.KeyboardEvent<HTMLInputElement>,
							) => {
								if (e.key === "Enter") {
									e.preventDefault();
									addInterest(e.currentTarget.value);
									e.currentTarget.value = "";
								}
							}}
						/>
						<button
							type="button"
							onClick={() => {
								const input =
									document.querySelector<HTMLInputElement>(
										'input[placeholder="Añadir interés"]',
									);
								if (input) {
									addInterest(input.value);
									input.value = "";
								}
							}}
							className={`rounded-md bg-gradient-to-r from-cyan-600 to-pink-600 px-4 py-2 text-white transition-colors duration-200 hover:from-cyan-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 ${!isEditing ? "hidden" : ""}`}
							disabled={!isEditing}
						>
							Añadir
						</button>
					</div>
				</div>

				{/* BOTON DE GUARDAR */}
				<div className="mt-6 flex justify-center md:mt-8">
					<button
						type="submit"
						className={`rounded-full ${
							datosActualizados ? "hidden" : "block"
						} transform bg-gradient-to-r from-cyan-600 to-pink-600 px-6 py-2 text-sm text-white transition-all duration-200 hover:scale-105 hover:from-cyan-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 md:px-8 md:text-base`}
					>
						Guardar Cambios
					</button>
				</div>
			</div>
		</form>
	);
}

export default PersonalInfo;
