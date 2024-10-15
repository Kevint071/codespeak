import React from "react";
import { CalendarDays, Mail, FolderGit2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function AccountInfo() {
	const params = useParams();
	const userID = params.userID;
	const [datos, setDatos] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`/api/profile/accountInfo/${userID}`);
			const data = await response.json();
			setDatos(data);
		};
		fetchData();
	}, [userID]);

	return (
		<div className="mx-auto min-h-[calc(100vh-5rem)] w-full max-w-4xl px-4 py-8">
			<div className="rounded-lg bg-gradient-to-br from-gray-900 to-black p-4 text-white shadow-xl sm:p-6">
				<h1 className="mb-6 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
					Información de la Cuenta
				</h1>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<InfoItem
						icon={
							<Mail className="h-6 w-6 flex-shrink-0 text-cyan-400" />
						}
						label="Correo Electrónico:"
						value={datos.email}
					/>
					<InfoItem
						icon={
							<CalendarDays className="h-6 w-6 flex-shrink-0 text-pink-400" />
						}
						label="Fecha de Creación:"
						value={
							datos.createdAt ? datos.createdAt.split("T")[0] : ""
						}
					/>
					<InfoItem
						icon={
							<CalendarDays className="h-6 w-6 flex-shrink-0 text-cyan-400" />
						}
						label="Última Edición:"
						value={
							datos.updatedAt ? datos.updatedAt.split("T")[0] : ""
						}
					/>
					<InfoItem
						icon={
							<FolderGit2 className="h-6 w-6 flex-shrink-0 text-pink-400" />
						}
						label="Proyectos Publicados:"
						value="0"
					/>
				</div>
			</div>
		</div>
	);
}

function InfoItem({ icon, label, value }) {
	return (
		<div className="flex h-full flex-col rounded-lg bg-gray-800 bg-opacity-50 p-4 transition-colors duration-200 hover:bg-opacity-70">
			<div className="mb-2 flex items-center space-x-4">
				{icon}
				<p className="text-sm text-gray-400">{label}</p>
			</div>
			<div className="flex flex-grow items-center">
				<p className="w-full break-all text-base font-medium">
					{value}
				</p>
			</div>
		</div>
	);
}
