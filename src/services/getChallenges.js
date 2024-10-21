import { STRAPI_API_URL } from "@/lib/config";
export const revalidate = 5;

export async function getChallenges() {
	try {
        console.log("API URL: ", STRAPI_API_URL);
		const res = await fetch(`${STRAPI_API_URL}/challenges?populate=*`, { next: {revalidate: 5} });
		if (!res.ok) {
			throw new Error("Failed to fetch challenges");
		}
		const { data } = await res.json();
		return data;
	} catch (error) {
		console.error("Error en getChallenges: ", error.message);
		throw error; // Re-lanzar el error para que pueda ser capturado en la llamada
	}
}

export async function getChallenge(slug) {
	try {
		const res = await fetch(
			`${STRAPI_API_URL}/challenges?filters[slug][$eq]=${slug}`,
		);
		if (!res.ok) {
			throw new Error("Failed to fetch challenge");
		}
		const { data } = await res.json();
		return data;
	} catch (error) {
		console.error("Error en getChallenge: ", error.message);
		throw error; // Re-lanzar el error para que pueda ser capturado en la llamada
	}
}