import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import DropDownNavBar from "@/components/NavBar/DropDownNavBar/DropDownNavBar";
import LogoTemp from "@/assets/Logo.svg";
import NavBarResources from "@/components/NavBar/NavBarResources";
import { getServerSession } from "next-auth/next";

export default async function NavBar() {
	const session = await getServerSession();

	return (
		<nav className="sticky top-0 z-50 h-20 border-b border-b-gray-600 bg-transparent py-2 backdrop-blur-3xl">
			<div className="container mx-auto max-w-[1280px] flex h-full items-center justify-between max-md:px-10 md:px-8 lg:px-20 xl:px-10 text-gray-300 transition-all duration-300">
				<div>
					<Link href="/">
						<Image
							src={LogoTemp}
							alt="Logo de CodeSpeak Temporal"
							className="w-36"
							priority={true}
						/>
					</Link>
				</div>
				<div className="hidden justify-center transition-all duration-500 md:flex">
					<ul className="z-50 flex flex-row items-center gap-x-8 font-medium text-sm lg:text-base">
						<NavBarResources />
						<Link
							href="/desafios"
							className="transition-all duration-300 hover:text-cyan-300"
						>
							<li>Desafíos</li>
						</Link>
						{/* <Link
							href="/proyectos"
							className="transition-all duration-300 hover:text-cyan-300"
						>
							<li>Proyectos</li>
						</Link> */}
					</ul>
				</div>

				<ul className="flex items-center justify-center gap-x-4 font-medium text-sm lg:text-base flex-row">
					{/* <Link href="#" className="flex">
						<button
							type="button"
							className="text-gray-300 transition-all duration-100 hover:text-[#ff69b4] focus:outline-none"
							aria-label="Buscar"
						>
							<Search size={24} />
						</button>
					</Link> */}

					{!session?.user && (
						<>
							<Link
								href="/auth/login"
								className="transition-all duration-300 hover:text-cyan-300"
							>
								<li className="hidden sm:list-item">Log In</li>
							</Link>
							<Link
								href="/auth/signUp"
								className="hidden w-20 sm:list-item lg:w-24"
							>
								<button
									type="button"
									className="bg-custom-gradient m-0 w-full rounded-full text-sm lg:text-base px-3 py-1 text-white sm:px-1 sm:py-1"
								>
									Sign Up
								</button>
							</Link>
						</>
					)}
					<DropDownNavBar />
				</ul>
			</div>
		</nav>
	);
}
