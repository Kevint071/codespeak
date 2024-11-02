import { STRAPI_API_URL } from "@/lib/config";

// Función auxiliar para hacer fetch con timeout
async function fetchWithTimeout(url, options = {}, timeout = 8000) {
	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);

	try {
		const response = await fetch(url, {
			...options,
			signal: controller.signal,
		});
		clearTimeout(id);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response;
	} catch (error) {
		clearTimeout(id);
		if (error.name === "AbortError") {
			throw new Error("La solicitud tardó demasiado tiempo en responder");
		}
		throw error;
	}
}

export async function getInfoNavBar(categoria) {
	try {
		const url = new URL(
			`${STRAPI_API_URL}/topics?populate=*&filters[category][$eq]=${categoria}`,
		);
		const res = await fetchWithTimeout(url.href);
		const { data } = await res.json();
		return data;
	} catch (error) {
		console.error("Error en getInfoNavBar: ", error.message);
		throw new Error(`Error al cargar la navegación: ${error.message}`);
	}
}

export async function getContent(slug) {
	try {
		const url = new URL(
			`${STRAPI_API_URL}/contents?populate=*&filters[subtopic][slug][$eq]=${slug}`,
		);
		const res = await fetchWithTimeout(url.href);
		const { data } = await res.json();

		if (data.length > 0) {
			const { title, content } = data[0];
			return { content, title };
		}
		return { content: [], title: "No hay Contenido Disponible" };
	} catch (error) {
		console.error("Error en getContent: ", error.message);
		throw new Error(`Error al cargar el contenido: ${error.message}`);
	}
}
