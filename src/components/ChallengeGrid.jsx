"use client";

import React from "react";
import ChallengeCard from "./ChallengeCard";
import Link from "next/link";

const ChallengeGrid = ({ challenges, viewMode }) => {
	return (
		<div
			className={`grid gap-6 ${
				viewMode === "grid"
					? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
					: "grid-cols-1"
			}`}
		>
			{challenges.length > 0 ? (
				challenges.map((challenge) => (
					<Link
						href={`/desafios/${challenge.slug}`}
						key={challenge.id}
					>
						<ChallengeCard
							challenge={challenge}
							viewMode={viewMode}
						/>
					</Link>
				))
			) : (
				<div className="col-span-full text-center text-gray-400">
					No se encontraron desafíos que coincidan con los filtros
					seleccionados.
				</div>
			)}
		</div>
	);
};

export default ChallengeGrid;
