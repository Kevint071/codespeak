"use client";
import React, { useState, useMemo, useCallback } from "react";
import ChallengeGrid from "@/components/ChallengeGrid";
import { Input } from "@/components/ui/input-desafios";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";

const difficultyRanges = {
	Fácil: [1, 2, 3],
	Medio: [4, 5, 6],
	Difícil: [7, 8, 9],
};

// Define categories
const categories = [
	"all",
	"Arrays",
	"Strings",
	"Recursión",
	"Backtracking",
	"Programación Dinámica",
	"Estructuras de Datos",
	"Optimización",
	"Iteración",
	"Ordenamiento",
	"Búsqueda",
];

export default function ClientPage({ challenges }) {
	// Estados para controlar el término de búsqueda, categoría seleccionada, dificultad, calificación y modo de visualización
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedDifficulty, setSelectedDifficulty] = useState("all");
	const [selectedRating, setSelectedRating] = useState("all");
	const [viewMode, setViewMode] = useState("grid"); // Modo de visualización (cuadrícula o lista)

	// Crea una lista de dificultades a partir de las claves del objeto difficultyRanges
	const difficulties = useMemo(
		() => ["all", ...Object.keys(difficultyRanges)],
		[],
	);

	// Filtra los desafíos en función de la búsqueda, categoría, dificultad y calificación
	const filteredChallenges = useMemo(() => {
		return challenges.filter((challenge) => {
			const titleMatch = challenge.title
				.toLowerCase()
				.includes(searchTerm.toLowerCase());

			const categoryMatch =
				selectedCategory === "all" ||
				challenge.category_challenges.some(
					(cat) =>
						cat.name.toLowerCase() ===
						selectedCategory.toLowerCase(),
				);

			const difficultyMatch =
				selectedDifficulty === "all" ||
				challenge.difficulty === selectedDifficulty;

			const ratingMatch =
				selectedRating === "all" ||
				challenge.rating === Number(selectedRating);

			// Retorna true solo si todos los filtros coinciden y el desafío tiene un slug
			return (
				titleMatch &&
				categoryMatch &&
				difficultyMatch &&
				ratingMatch &&
				challenge.slug
			);
		});
	}, [
		searchTerm,
		selectedCategory,
		selectedDifficulty,
		selectedRating,
		challenges,
	]);

	// Calcula las calificaciones disponibles en función de la dificultad seleccionada
	const availableRatings = useMemo(() => {
		if (selectedDifficulty === "all") {
			return ["all", ...new Set(challenges.map((c) => c.rating))].sort(
				(a, b) => a - b,
			);
		}
		return ["all", ...difficultyRanges[selectedDifficulty]];
	}, [selectedDifficulty, challenges]);

	// Manejador para cambiar la dificultad seleccionada y ajustar la calificación si es necesario
	const handleDifficultyChange = useCallback(
		(difficulty) => {
			setSelectedDifficulty(difficulty);
			if (difficulty !== "all" && selectedRating !== "all") {
				const validRatings = difficultyRanges[difficulty];
				// Resetea la calificación si no es válida para la nueva dificultad
				if (!validRatings.includes(Number(selectedRating))) {
					setSelectedRating("all");
				}
			}
		},
		[selectedRating],
	);

	// Manejador para cambiar la calificación seleccionada y ajustar la dificultad si es necesario
	const handleRatingChange = useCallback(
		(rating) => {
			setSelectedRating(rating);
			if (rating !== "all" && selectedDifficulty !== "all") {
				const ratingNum = Number(rating);
				// Ajusta la dificultad si la calificación no coincide con la dificultad seleccionada
				const correctDifficulty = Object.entries(difficultyRanges).find(
					([, range]) => range.includes(ratingNum),
				)?.[0];
				if (correctDifficulty !== selectedDifficulty) {
					setSelectedDifficulty(correctDifficulty);
				}
			}
		},
		[selectedDifficulty],
	);

	return (
		<div className="container mx-auto my-20 min-h-screen rounded-lg px-12 py-8 text-white">
			{/* Encabezado de la página */}
			<div className="mb-8">
				<h1 className="mb-4 text-4xl font-bold">
					Desafíos de Programación
				</h1>
				<p className="text-gray-400">
					Explora y mejora tus habilidades con nuestros desafíos de
					programación.
				</p>
			</div>

			{/* Controles de filtrado y búsqueda */}
			<div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
				<Input
					placeholder="Buscar desafíos..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
					className="bg-gray-800 text-white"
				/>
				{/* Selector de categoría */}
				<Select
					onValueChange={setSelectedCategory} // Actualiza la categoría seleccionada
					value={selectedCategory}
				>
					<SelectTrigger className="bg-gray-800 text-white">
						<SelectValue placeholder="Categoría" />
					</SelectTrigger>
					<SelectContent>
						{categories.map((category) => (
							<SelectItem key={category} value={category}>
								{category === "all" ? "Categoria" : category}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{/* Selector de dificultad */}
				<Select
					onValueChange={handleDifficultyChange} // Actualiza la dificultad seleccionada
					value={selectedDifficulty}
				>
					<SelectTrigger className="bg-gray-800 text-white">
						<SelectValue placeholder="Dificultad" />
					</SelectTrigger>
					<SelectContent>
						{difficulties.map((diff) => (
							<SelectItem key={diff} value={diff}>
								{diff === "all" ? "Dificultad" : diff}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{/* Selector de calificación */}
				<Select
					onValueChange={handleRatingChange} // Actualiza la calificación seleccionada
					value={selectedRating}
				>
					<SelectTrigger className="bg-gray-800 text-white">
						<SelectValue placeholder="Estrellas" />
					</SelectTrigger>
					<SelectContent>
						{availableRatings.map((rating) => (
							<SelectItem key={rating} value={rating.toString()}>
								{rating === "all"
									? "Estrellas"
									: `${rating} ${rating === 1 ? "estrella" : "estrellas"}`}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{/* Botones para cambiar el modo de vista (grid/lista) */}
				<div className="flex gap-2 max-sm:hidden">
					<Button
						variant={viewMode === "grid" ? "default" : "outline"}
						size="icon"
						onClick={() => setViewMode("grid")} // Cambia a vista de cuadrícula
					>
						<Grid className="h-4 w-4" />
					</Button>
					<Button
						variant={viewMode === "list" ? "default" : "outline"}
						size="icon"
						onClick={() => setViewMode("list")} // Cambia a vista de lista
					>
						<List className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{/* Muestra los desafíos filtrados */}
			<ChallengeGrid
				challenges={filteredChallenges} // Desafíos filtrados según los criterios seleccionados
				viewMode={viewMode} // Modo de visualización seleccionado
			/>
		</div>
	);
}
