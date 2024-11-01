import { STRAPI_API_URL } from "@/lib/config";

export async function getInfoNavBar(categoria) {
	try {
		const url = new URL(
			`${STRAPI_API_URL}/topics?populate=*&filters[category][$eq]=${categoria}`,
		);
		const res = await fetch(url.href);
		if (!res.ok) {
			throw new Error("Failed to fetch topics");
		}
		const { data } = await res.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error("Error en getInfoNavBar: ", error.message);
		throw error; // Re-lanzar el error para que pueda ser capturado en la llamada
	}
}

export async function getContent(slug) {
	const url = new URL(
		`${STRAPI_API_URL}/contents?populate=*&filters[subtopic][slug][$eq]=${slug}`,
	);
	const res = await fetch(url.href);
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
