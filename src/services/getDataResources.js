import { STRAPI_API_URL } from "@/lib/config";

export async function getInfoNavBar(categoria) {
	try {
		console.log("API URL: ", STRAPI_API_URL);
		const res = await fetch(
			`${STRAPI_API_URL}/topics?populate=*&filters[category][$eq]=${categoria}`,
		);
		if (!res.ok) {
			throw new Error("Failed to fetch topics");
		}
		const { data } = await res.json();
		return data;
	} catch (error) {
		console.error("Error en getInfoNavBar: ", error.message);
		throw error; // Re-lanzar el error para que pueda ser capturado en la llamada
	}
}

export async function getContent(slug) {
	const res = await fetch(
		`${STRAPI_API_URL}/contents?filters[subtopic][slug][$eq]=${slug}`,
	);
	if (!res.ok) {
		throw new Error("Failed to fetch content");
	}
	const { data } = await res.json();
	if (data.length > 0) {
		const { title, content } = await data[0];
		return { content, title };
	}
	return { content: [], title: "No hay Contenido Disponible" };
}
