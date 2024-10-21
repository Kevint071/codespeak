import { STRAPI_API_URL } from "@/lib/config";

export async function getChallenges() {
	try {
        console.log("API URL: ", STRAPI_API_URL);
		const res = await fetch(`${STRAPI_API_URL}/challenges?populate=*`);
		if (!res.ok) {
			throw new Error("Failed to fetch challenges");
		}
		const { data } = await res.json();
		return data;
	} catch (error) {
		console.error("Error en getChallenges: ", error);
		throw error; // Re-lanzar el error para que pueda ser capturado en la llamada
	}
}

export async function getChallenge(slug: string) {
	try {
		const res = await fetch(
			`${STRAPI_API_URL}/challenges?populate=*&filters[slug][$eq]=${slug}`, {next: {revalidate: 5}}
		);
		if (!res.ok) {
			throw new Error("Failed to fetch challenge");
		}
		const { data } = await res.json();
		return data[0];
	} catch (error) {
		console.error("Error en getChallenge: ", error);
		throw error; // Re-lanzar el error para que pueda ser capturado en la llamada
	}
}