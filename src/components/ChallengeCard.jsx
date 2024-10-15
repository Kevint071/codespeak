import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const ChallengeCard = ({ challenge, viewMode }) => {
	const { title, difficulty, rating, category_challenges } = challenge;
  console.log(category_challenges);
	const categories = category_challenges.map((cat) => cat.name);

	return (
		<Card
			className={`flex ${
				viewMode === "list"
					? "flex-col sm:flex-row"
					: "flex-col justify-center gap-y-2"
			} border-gray-700 bg-gray-950 text-white`}
		>
			<CardHeader
				className={`${
					viewMode === "list"
						? "w-full sm:w-1/3 sm:flex-shrink-0"
						: "w-full"
				}`}
			>
				<CardTitle className="text-xl font-bold">{title}</CardTitle>
			</CardHeader>
			<CardContent
				className={`flex flex-col ${
					viewMode === "list"
						? "w-full py-1 sm:flex-row sm:items-center sm:justify-between max-sm:mb-4"
						: "justify-between"
				} gap-4`}
			>
				<div
					className={`flex flex-col ${
						viewMode === "list"
							? "sm:flex-row sm:items-center sm:gap-4"
							: "items-start"
					} gap-2`}
				>
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
					<div className="flex items-center">
						{[...Array(9)].map((_, index) => (
							<Star
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={index}
								className={`h-5 w-5 ${
									index < rating
										? "fill-current text-yellow-400"
										: "text-gray-600"
								}`}
							/>
						))}
					</div>
				</div>
				<div className="flex flex-wrap gap-2">
					{categories.map((category) => (
						<Badge key={category} variant="secondary">
							{category}
						</Badge>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default ChallengeCard;
