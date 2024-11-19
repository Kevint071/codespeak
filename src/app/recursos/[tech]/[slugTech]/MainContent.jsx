import { getContent } from "@/services/getDataResources";
import RenderMainContent from "@/app/recursos/[tech]/[slugTech]/RenderMainContent";

async function MainContent({ slug, categoria }) {
	let title = "No hay Contenido Disponible";
	let content = [];
	let error = null;
	try {
		const fetchedContent = await getContent(slug);
		content = fetchedContent.content;
		title = fetchedContent.title;
	} catch (fetchError) {
		console.error("Error fetching content:", fetchError);
		error = fetchError;
	}
	return (
		<>
			{error ? (
				<div className="flex h-full w-full items-center justify-center px-8 py-10">
					<output className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
						<strong className="font-bold">Error de carga: </strong>
						<span className="block sm:inline">
							No se pudieron cargar los recursos para {categoria}.
							Por favor, intenta recargar la página.
						</span>
					</output>
				</div>
			) : (
				<main className="mx-4 min-h-[calc(100vh-5rem)] w-full">
					<div className="mx-auto w-full py-10 sm:w-[500px] md:w-[690px] lg:w-[600px] xl:w-[768px]">
						<h1 className="mb-6 mt-3 w-full text-4xl font-bold text-[#ff69b4]">
							{title}
						</h1>
						<RenderMainContent
							content={content}
							categoria={categoria}
						/>
					</div>
				</main>
			)}
		</>
	);
}

export default MainContent;
