import { Suspense } from "react";
import { getInfoNavBar } from "@/services/getDataResources";
import MainContent from "@/app/recursos/[tech]/[slugTech]/MainContent";
import NavBarContent from "@/app/recursos/[tech]/[slugTech]/NavBarContent";
import MainContentSkeleton from "@/app/recursos/[tech]/[slugTech]/MainContentSkeleton";

export default async function Component({ params }) {
	const categoria = params.tech;
	const enlaceNavBar = params.slugTech;
	const topics = await getInfoNavBar(categoria);

	return (
		<div className="mx-auto container max-w-7xl">
			<div className="flex justify-center gap-x-8 text-gray-300 px-10">
				<NavBarContent topics={topics} />
				<Suspense fallback={<MainContentSkeleton />}>
					<MainContent slug={enlaceNavBar} categoria={categoria} />
				</Suspense>
			</div>
		</div>
	);
}
