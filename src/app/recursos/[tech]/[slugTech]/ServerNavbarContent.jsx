import { getInfoNavBar } from "@/services/getDataResources";
import NavBarContent from "@/app/recursos/[tech]/[slugTech]/NavBarContent";

async function ServerNavbarContent({ categoria }) {
	let topics = [];
	let error = null;

	try {
		topics = await getInfoNavBar(categoria);
        console.log(topics);
	} catch (fetchError) {
		console.error("Error fetching navbar topics:", fetchError);
		error = fetchError;
	}
	return (
		<>
			{error ? (
				<div className="flex h-full max-w-sm items-center justify-center px-8 py-10 max-sm:hidden">
					<output className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
						<strong className="font-bold">Error de carga: </strong>
						<span className="block sm:inline">
							No se pudieron cargar los temas para {categoria}.
							Por favor, intenta recargar la página.
						</span>
					</output>
				</div>
			) : (
				<NavBarContent topics={topics} />
			)}
		</>
	);
}

export default ServerNavbarContent;
