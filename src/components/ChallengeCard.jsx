import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const ChallengeCard = ({ challenge, viewMode }) => {
	// Extrae los detalles del desafío de las props
	const { title, difficulty, rating, category_challenges } = challenge;

	// Mapea las categorías del desafío
	const categories = category_challenges.map((cat) => cat.name);

	return (
		<Card
			className={`flex ${
				viewMode === "list"
					? "flex-col sm:flex-row" // Estilo de lista
					: "flex-col justify-center gap-y-2" // Estilo de cuadrícula
			} border-gray-700 bg-gray-950 text-white`}
		>
			{/* Título del desafío */}
			<CardHeader
				className={`${
					viewMode === "list"
						? "w-full sm:w-1/3 sm:flex-shrink-0" // Ajusta el ancho en vista de lista
						: "w-full"
				}`}
			>
				<CardTitle className="text-xl font-bold">{title}</CardTitle>
			</CardHeader>

			<CardContent
				className={`flex flex-col ${
					viewMode === "list"
						? "w-full py-1 max-sm:mb-4 sm:flex-row sm:items-center sm:justify-between"
						: "justify-between"
				} gap-4`}
			>
				{/* Sección que incluye la dificultad y la calificación */}
				<div
					className={`flex flex-col ${
						viewMode === "list"
							? "sm:flex-row sm:items-center sm:gap-4"
							: "items-start"
					} gap-2`}
				>
					{/* Muestra la dificultad con diferentes colores */}
					<Badge
						variant="outline"
						className={`flex w-14 justify-center border-none ${
							difficulty === "Fácil"
								? "bg-green-600"
								: difficulty === "Medio"
									? "bg-yellow-600"
									: "bg-red-600"
						}`}
					>
						{difficulty}
					</Badge>

					{/* Muestra la calificación usando estrellas */}
					<div className="flex items-center">
						{[...Array(9)].map((_, index) => (
							<Star
								// Genera estrellas, con relleno si el índice es menor que la calificación
								// biome-ignore lint/suspicious/noArrayIndexKey: Don´t necessary
								key={index}
								className={`h-5 w-5 ${
									index < rating
										? "fill-current text-yellow-400" // Estrella llena
										: "text-gray-600" // Estrella vacía
								}`}
							/>
						))}
					</div>
				</div>

				{/* Muestra las categorías del desafío */}
				<div className="flex flex-wrap gap-2">
					{categories.map((category) => (
						<Badge key={category} variant="secondary">
							{category} {/* Nombre de la categoría */}
						</Badge>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default ChallengeCard;