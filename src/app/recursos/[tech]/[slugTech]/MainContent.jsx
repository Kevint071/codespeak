import { getContent } from "@/services/getDataResources";
import RenderMainContent from "@/app/recursos/[tech]/[slugTech]/RenderMainContent";

async function MainContent({ slug, categoria }) {
	const { title, content } = await getContent(slug);
	return (
		<main className="min-h-[calc(100vh-5rem)] w-full mx-4">
			<div className="py-10 mx-auto w-full sm:w-[500px] md:w-[690px] lg:w-[600px] xl:w-[768px]">
				<h1 className="mt-6 mb-10 text-4xl w-full font-bold text-[#ff69b4]">
					{title}
				</h1>
				<RenderMainContent content={content} categoria={categoria} />
			</div>
		</main>
	);
}

export default MainContent;
