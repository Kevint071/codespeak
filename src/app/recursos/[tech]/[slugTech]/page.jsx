import { Suspense } from "react";
import MainContent from "@/app/recursos/[tech]/[slugTech]/MainContent";
import MainContentSkeleton from "@/app/recursos/[tech]/[slugTech]/MainContentSkeleton";
import NavBarContentSkeleton from "@/app/recursos/[tech]/[slugTech]/NavBarContentSkeleton";
import ServerNavbarContent from "@/app/recursos/[tech]/[slugTech]/ServerNavbarContent";

export default async function Component({ params }) {
	const categoria = params.tech;
	const enlaceNavBar = params.slugTech;

	return (
		<div className="container mx-auto max-w-7xl">
				<div className="flex justify-center gap-x-8 px-10 text-gray-300">
					<Suspense fallback={<NavBarContentSkeleton />}>
						<ServerNavbarContent categoria={categoria} />
					</Suspense>
					<Suspense fallback={<MainContentSkeleton />}>
						<MainContent
							slug={enlaceNavBar}
							categoria={categoria}
						/>
					</Suspense>
				</div>
		</div>
	);
}