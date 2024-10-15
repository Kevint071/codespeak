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
	"Lógica",
	"Algoritmos",
	"Matemáticas",
	"Cifrado",
	"Optimización",
	"Búsqueda",
	"Ordenamiento",
	"Grafos",
	"Complejidad",
];

export default function ClientPage({ challenges }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedDifficulty, setSelectedDifficulty] = useState("all");
	const [selectedRating, setSelectedRating] = useState("all");
	const [viewMode, setViewMode] = useState("grid");

	const difficulties = useMemo(
		() => ["all", ...Object.keys(difficultyRanges)],
		[],
	);

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

			return (
				titleMatch && categoryMatch && difficultyMatch && ratingMatch && challenge.slug
			);
		});
	}, [
		searchTerm,
		selectedCategory,
		selectedDifficulty,
		selectedRating,
		challenges,
	]);

	const availableRatings = useMemo(() => {
		if (selectedDifficulty === "all") {
			return ["all", ...new Set(challenges.map((c) => c.rating))].sort(
				(a, b) => a - b,
			);
		}
		return ["all", ...difficultyRanges[selectedDifficulty]];
	}, [selectedDifficulty, challenges]);

	const handleDifficultyChange = useCallback(
		(difficulty) => {
			setSelectedDifficulty(difficulty);
			if (difficulty !== "all" && selectedRating !== "all") {
				const validRatings = difficultyRanges[difficulty];
				if (!validRatings.includes(Number(selectedRating))) {
					setSelectedRating("all");
				}
			}
		},
		[selectedRating],
	);

	const handleRatingChange = useCallback(
		(rating) => {
			setSelectedRating(rating);
			if (rating !== "all" && selectedDifficulty !== "all") {
				const ratingNum = Number(rating);
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
		<div className="container mx-auto min-h-screen rounded-lg px-12 py-8 my-20 text-white">
			<div className="mb-8">
				<h1 className="mb-4 text-4xl font-bold">
					Desafíos de Programación
				</h1>
				<p className="text-gray-400">
					Explora y mejora tus habilidades con nuestros desafíos de
					programación.
				</p>
			</div>
			<div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
				<Input
					placeholder="Buscar desafíos..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="bg-gray-800 text-white"
				/>
				<Select
					onValueChange={setSelectedCategory}
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
				<Select
					onValueChange={handleDifficultyChange}
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
				<Select
					onValueChange={handleRatingChange}
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
				<div className="flex gap-2 max-sm:hidden">
					<Button
						variant={viewMode === "grid" ? "default" : "outline"}
						size="icon"
						onClick={() => setViewMode("grid")}
					>
						<Grid className="h-4 w-4" />
					</Button>
					<Button
						variant={viewMode === "list" ? "default" : "outline"}
						size="icon"
						onClick={() => setViewMode("list")}
					>
						<List className="h-4 w-4" />
					</Button>
				</div>
			</div>
			<ChallengeGrid
				challenges={filteredChallenges}
				viewMode={viewMode}
			/>
		</div>
	);
}
