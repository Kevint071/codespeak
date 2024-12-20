import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getChallenge } from "@/services/getChallenges";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowLeft } from "lucide-react";

export default async function ChallengePage({
	params,
}: {
	params: { desafioID: string };
}) {
	try {
		const challenge = await getChallenge(params.desafioID);
		if (!challenge) {
			throw new Error("Desafío no encontrado");
		}

		return (
			<div className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
				<Link href="/desafios">
					<Button variant="outline" className="mb-6">
						<ArrowLeft className="mr-2 h-4 w-4" /> Volver a la lista de desafíos
					</Button>
				</Link>
				<Card className="mx-auto max-w-4xl">
					<CardHeader>
						<CardTitle className="text-3xl">{challenge.title}</CardTitle>
						<CardDescription>
							<div className="mt-2 flex items-center space-x-4">
								<Badge variant={challenge.difficulty === "Fácil" ? "success" : "destructive"}>
									{challenge.difficulty}
								</Badge>
								<div className="flex items-center">
									{[...Array(10)].map((_, i) => (
										<Star
											key={_}
											className={`h-4 w-4 ${
												i < challenge.rating ? "fill-current text-yellow-400" : "text-gray-300"
											}`}
										/>
									))}
								</div>
							</div>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<h3 className="mb-2 text-xl font-semibold">Descripción</h3>
						<p className="mb-4">{challenge.description}</p>

						<h3 className="mb-2 text-xl font-semibold">Ejemplo</h3>
						<p>
							<strong>Entrada:</strong> {challenge.exampleInput}
						</p>
						<p>
							<strong>Salida:</strong> {challenge.exampleOutput}
						</p>

						<h3 className="mb-2 mt-4 text-xl font-semibold">Pistas</h3>
						<ul className="list-disc pl-5">
							{challenge.hints.map((hint: { hint: string }) => (
								<li key={hint.hint}>{hint.hint}</li>
							))}
						</ul>
					</CardContent>
					<CardFooter>
						<div className="flex flex-wrap gap-2">
							{challenge.category_challenges.map((tag: { name: string }) => (
								<Badge key={tag.name} variant="secondary">
									{tag.name}
								</Badge>
							))}
						</div>
					</CardFooter>
				</Card>
			</div>
		);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		// Componente de error
		return (
			<div className="min-h-screen bg-gradient-to-b from-background to-secondary p-8 flex justify-center items-center">
				<output className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					<strong className="font-bold">Error: </strong>
					{error.message || "No se pudo cargar el desafío"}
				</output>
			</div>
		);
	}
}
