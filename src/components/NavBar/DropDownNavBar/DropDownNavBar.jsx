"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { IoPerson } from "react-icons/io5";
// import { LuActivity } from "react-icons/lu";
// import { GoFileDirectoryFill } from "react-icons/go";
import { TbLogout, TbFileTypeSql } from "react-icons/tb";
import { FaPython, FaReact, FaHtml5 } from "react-icons/fa6";
import { RiJavascriptFill, RiTailwindCssFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

import DropdownMenuTrigger from "@/components/NavBar/DropDownNavBar/DropDownMenuTrigger";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

function DropDownNavBar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const session = useSession();
	const router = useRouter();

	const logout = () => {
		// Detectamos si estamos en el túnel o en localhost
		const currentUrl = window.location.href;
		const isTunnel = currentUrl.includes("trycloudflare");

		isTunnel && console.log("TUNNEL_URL:", process.env.NEXT_PUBLIC_TUNNEL_URL);

		// Hacemos signOut sin redirección automática
		signOut({ redirect: false }).then(() => {
			// Redirigimos manualmente según el entorno
			const redirectUrl = isTunnel
				? process.env.NEXT_PUBLIC_TUNNEL_URL
				: "/";

			router.push(redirectUrl);
			router.refresh();
			console.log(redirectUrl);
		});
	};

	const mdHidden = !session.data ? "md:hidden" : "";
	const align = !session.data ? "end" : "center";

	const toggleMenu = () => {
		setMenuOpen((prev) => !prev);
	};
	return (
		<div
			className={`flex items-center justify-center text-gray-300 hover:text-white focus:outline-none ${mdHidden}`}
		>
			<DropdownMenu onOpenChange={toggleMenu}>
				<DropdownMenuTrigger menuOpen={menuOpen} />
				<DropdownMenuContent
					className={`w-48 ${mdHidden}`}
					align={align}
					sideOffset={10}
				>
					{session.data ? (
						<DropdownMenuLabel className="gradient-text text-base font-bold brightness-125">
							Mi Cuenta
						</DropdownMenuLabel>
					) : (
						<DropdownMenuLabel className="gradient-text text-center text-base font-bold brightness-125">
							Acceso
						</DropdownMenuLabel>
					)}
					{!session.data ? (
						<>
							<DropdownMenuSeparator />
							<Link href="/auth/login" className="sm:hidden">
								<DropdownMenuItem>
									Login
									<DropdownMenuShortcut>
										🔑
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							</Link>
							<Link href="/auth/signUp" className="sm:hidden">
								<DropdownMenuItem>
									Sign Up
									<DropdownMenuShortcut>
										📝
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							</Link>
						</>
					) : (
						<>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<Link href={`/profile/${session.data.user.id}`}>
									<DropdownMenuItem>
										Perfil
										<DropdownMenuShortcut>
											<IoPerson
												color="#ff893b"
												size={16}
											/>
										</DropdownMenuShortcut>
									</DropdownMenuItem>
								</Link>

								{/* <Link href="/actividad">
									<DropdownMenuItem>
										Actividad
										<DropdownMenuShortcut>
											<LuActivity
												color="#00ff00"
												size={16}
											/>
										</DropdownMenuShortcut>
									</DropdownMenuItem>
								</Link> */}

								{/* <Link href="/mis-proyectos">
									<DropdownMenuItem>
										Mis Proyectos
										<DropdownMenuShortcut>
											<GoFileDirectoryFill
												color="#ffee00"
												size={16}
											/>
										</DropdownMenuShortcut>
									</DropdownMenuItem>
								</Link> */}
							</DropdownMenuGroup>
						</>
					)}
					<DropdownMenuGroup className="md:hidden">
						<DropdownMenuSub>
							<DropdownMenuSubTrigger className="focus:text-cyan-300">
								Recursos
							</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent
									className="w-48 bg-gray-800"
									alignOffset={-5}
									sideOffset={7}
								>
									<Link href="/recursos/python/que-es-python">
										<DropdownMenuItem>
											Python
											<DropdownMenuShortcut>
												<FaPython
													size={16}
													color="#ffba3b"
												/>
											</DropdownMenuShortcut>
										</DropdownMenuItem>
									</Link>
									<Link href="/recursos/javascript/que-es-javascript">
										<DropdownMenuItem>
											JavaScript
											<DropdownMenuShortcut>
												<RiJavascriptFill
													size={16}
													color="#f7df1e"
												/>
											</DropdownMenuShortcut>
										</DropdownMenuItem>
									</Link>
									<DropdownMenuItem>
										React
										<DropdownMenuShortcut>
											<FaReact
												size={16}
												color="#61dafb"
											/>
										</DropdownMenuShortcut>
									</DropdownMenuItem>
									<DropdownMenuItem>
										HTML
										<DropdownMenuShortcut>
											<FaHtml5
												size={16}
												color="#e34f26"
											/>
										</DropdownMenuShortcut>
									</DropdownMenuItem>
									<DropdownMenuItem>
										Tailwind CSS
										<DropdownMenuShortcut>
											<RiTailwindCssFill
												size={16}
												color="#06b6d4"
											/>
										</DropdownMenuShortcut>
									</DropdownMenuItem>
									<DropdownMenuItem>
										SQL
										<DropdownMenuShortcut>
											<TbFileTypeSql
												size={16}
												color="#f87979"
											/>
										</DropdownMenuShortcut>
									</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
						<Link href="/desafios">
							<DropdownMenuItem>
								Desafíos
								<DropdownMenuShortcut>🏆</DropdownMenuShortcut>
							</DropdownMenuItem>
						</Link>
						{/* <Link href="/proyectos">
							<DropdownMenuItem>
								Proyectos
								<DropdownMenuShortcut>📝</DropdownMenuShortcut>
							</DropdownMenuItem>
						</Link> */}
					</DropdownMenuGroup>
					{session.data && (
						<Link href="/auth/login" onClick={logout}>
							<DropdownMenuItem>
								Log Out
								<DropdownMenuShortcut>
									<TbLogout color="red" size={16} />
								</DropdownMenuShortcut>
							</DropdownMenuItem>
						</Link>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export default DropDownNavBar;
