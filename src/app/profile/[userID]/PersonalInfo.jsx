import { useEffect, useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { X, ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/Input";

function PersonalInfo() {
	const params = useParams();
	const [interests, setInterests] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [datosActualizados, setDatosActualizado] = useState(true);

	const [imageFile, setImageFile] = useState(null);
	const [imageProfileUrl, setImageProfileUrl] = useState(null);
	const [imagenActual, setImagenActual] = useState(imageProfileUrl);

	const { register, handleSubmit, setValue, getValues } = useForm({
		defaultValues: {
			name: "",
			username: "",
			gender: null,
			birthdate: null,
			aboutMe: null,
		},
	});

	const addInterest = useCallback(
		(interestName) => {
			if (
				interestName &&
				!interests.some((interest) => interest.name === interestName)
			) {
				setInterests((prevInterests) => [
					...prevInterests,
					{ id: Date.now(), name: interestName },
				]);
				setDatosActualizado(false);
			}
		},
		[interests],
	);

	const removeInterest = useCallback((id) => {
		setInterests((prevInterests) =>
			prevInterests.filter((interest) => interest.id !== id),
		);
		setDatosActualizado(false);
	}, []);

	const fetchProfile = useCallback(async () => {
		try {
			const response = await fetch(`/api/profile/${params.userID}`);
			const data = await response.json();
			if (data.birthdate) {
				const formattedDate = data.birthdate.split("T")[0];
				setValue("birthdate", formattedDate);
			}
			if (data) {
				setValue("name", data.name);
				setValue("username", data.username);
				setValue("gender", data.gender);
				setValue("aboutMe", data.aboutMe);
				setImageProfileUrl(data.imageProfile);
				setImagenActual(data.imageProfile);
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

	// biome-ignore lint/correctness/useExhaustiveDependencies: It needs to be used only once when rendering the component.
	useEffect(() => {
		fetchProfile();
	}, []);

	const onSubmit = handleSubmit(async (datos) => {
		try {
			const formData = new FormData();
			formData.append("name", datos.name);
			formData.append("username", datos.username);
			formData.append("gender", datos.gender);
			formData.append("aboutMe", datos.aboutMe);
			formData.append(
				"interests",
				JSON.stringify(interests.map((interest) => interest.name)),
			);
			if (imageProfileUrl == null || imageProfileUrl.startsWith("blob")) {
				formData.append("imageFile", imageFile);
			} else {
				formData.append("imageFile", "");
			}
			if (datos.birthdate) {
				formData.append("birthdate", datos.birthdate);
			} else {
				formData.append("birthdate", "");
			}

			const response = await fetch(`/api/profile/${params.userID}`, {
				method: "PUT",
				body: formData,
			});

			const result = await response.json();

			if (response.ok) {
				console.log("Perfil actualizado con éxito");
				setDatosActualizado(true);
				setIsEditing(false);
				await fetchProfile(); // Refetch the profile to ensure we have the latest data
				if (imagenActual !== imageProfileUrl) {
					setImagenActual(imageProfileUrl);
					window.location.reload();
				}
			} else {
				console.error("Error al actualizar perfil", result);
			}
		} catch (error) {
			console.error("Error al actualizar perfil", error);
		}
	});

	// Logica user image

	const fileInputRef = useRef(null);

	const handleInteraction = () => {
		if (isEditing && fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (e) => {
		if (e.target.files?.[0]) {
			const file = e.target.files[0];
			setImageFile(file);
			const objectUrl = URL.createObjectURL(file);
			setImageProfileUrl(objectUrl);
		}
	};

	const handleDeletePhoto = () => {
		setImageProfileUrl(null);
		setImageFile(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
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
								{...register("username", { required: true })}
								readOnly={!isEditing}
							/>
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
								{...register("gender")}
								disabled={!isEditing}
							>
								<option
									className="bg-gray-800 text-sm text-gray-200"
									value=""
								>
									Seleccionar
								</option>
								<option
									className="bg-gray-800 text-sm text-gray-200"
									value="masculino"
								>
									Masculino
								</option>
								<option
									className="bg-gray-800 text-sm text-gray-200"
									value="femenino"
								>
									Femenino
								</option>
								<option
									className="bg-gray-800 text-sm text-gray-200"
									value="otro"
								>
									Prefiero no decirlo
								</option>
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
							className="flex-grow border-gray-700 bg-gray-800 text-white focus:border-cyan-400 focus:ring-cyan-400"
							readOnly={!isEditing}
							onKeyDown={(e) => {
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
								const input = document.querySelector(
									'input[placeholder="Añadir interés"]',
								);
								addInterest(input.value);
								input.value = "";
							}}
							className="rounded-md bg-gradient-to-r from-cyan-600 to-pink-600 px-4 py-2 text-white transition-colors duration-200 hover:from-cyan-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
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
