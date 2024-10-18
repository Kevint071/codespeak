import React from "react";
import { CalendarDays, Mail, FolderGit2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function AccountInfo() {
	// Obtiene el userID de los parámetros de la URL
	const params = useParams();
	const userID = params.userID;

	// Estado para almacenar los datos del usuario obtenidos desde la API
	const [datos, setDatos] = useState({});

	useEffect(() => {
		// Función para obtener los datos del perfil desde la API
		const fetchData = async () => {
			const response = await fetch(`/api/profile/accountInfo/${userID}`);
			const data = await response.json();
			setDatos(data); // Actualiza el estado con los datos obtenidos
		};

		fetchData(); // Llama a la función al montar el componente
	}, [userID]); // Vuelve a ejecutar si el userID cambia

	return (
		<div className="mx-auto min-h-[calc(100vh-5rem)] w-full max-w-4xl px-4 py-8">
			<div className="rounded-lg bg-gradient-to-br from-gray-900 to-black p-4 text-white shadow-xl sm:p-6">
				<h1 className="mb-6 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
					Información de la Cuenta
				</h1>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{/* Renderiza los elementos de información con íconos y datos */}
					<InfoItem
						icon={
							<Mail className="h-6 w-6 flex-shrink-0 text-cyan-400" />
						}
						label="Correo Electrónico:"
						value={datos.email} // Muestra el email del usuario
					/>
					<InfoItem
						icon={
							<CalendarDays className="h-6 w-6 flex-shrink-0 text-pink-400" />
						}
						label="Fecha de Creación:"
						value={
							datos.createdAt ? datos.createdAt.split("T")[0] : ""
						} // Formatea la fecha
					/>
					<InfoItem
						icon={
							<CalendarDays className="h-6 w-6 flex-shrink-0 text-cyan-400" />
						}
						label="Última Edición:"
						value={
							datos.updatedAt ? datos.updatedAt.split("T")[0] : ""
						} // Muestra última actualización
					/>
					<InfoItem
						icon={
							<FolderGit2 className="h-6 w-6 flex-shrink-0 text-pink-400" />
						}
						label="Proyectos Publicados:"
						value="0" // Valor fijo para proyectos (puede ser dinámico en el futuro)
					/>
				</div>
			</div>
		</div>
	);
}

// Componente reutilizable para mostrar un ítem de información
function InfoItem({ icon, label, value }) {
	return (
		<div className="flex h-full flex-col rounded-lg bg-gray-800 bg-opacity-50 p-4 transition-colors duration-200 hover:bg-opacity-70">
			<div className="mb-2 flex items-center space-x-4">
				{icon} {/* Ícono del ítem */}
				<p className="text-sm text-gray-400">{label}</p>
				{/* Etiqueta del dato */}
			</div>
			<div className="flex flex-grow items-center">
				<p className="w-full break-all text-base font-medium">
					{value} {/* Valor del dato mostrado */}
				</p>
			</div>
		</div>
	);
}
