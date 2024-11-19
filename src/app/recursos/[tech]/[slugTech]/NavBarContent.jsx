"use client";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HamburgerButton from "./HamburgerButton";

function NavBarContent({ topics }) {

	// Función para ordenar los subtopics
	const orderSubtopics = (subtopics) => {
		return [...subtopics].sort((a, b) => {
		// Si ambos tienen order, los ordenamos por order
		if (a.order !== null && b.order !== null) {
			return a.order - b.order;
		}
		
		// Si alguno tiene order null, usamos la fecha de creación como fallback
		if (a.order === null && b.order === null) {
			return new Date(a.createdAt) - new Date(b.createdAt);
		}
		
		// Si solo uno tiene order null, el que tiene order va primero
		if (a.order === null) return 1;
		if (b.order === null) return -1;
		
		return 0;
		});
	};

	// Ordenar los subtopics de cada tema
	const orderedData = topics.map(topic => ({
		...topic,
		subtopics: orderSubtopics(topic.subtopics)
	}));
	console.log(orderedData);

	// Estado para manejar qué tema está abierto en el menú de navegación
	const [openTopic, setOpenTopic] = useState(null);

	// Estado para manejar si el menú está abierto en dispositivos móviles
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Obtiene la ruta actual de la aplicación
	const pathname = usePathname();

	// Efecto para abrir el tema correcto basado en la URL actual
	useEffect(() => {
		const activeTopicIndex = topics.findIndex(({ subtopics }) =>
			subtopics.some((sub) => pathname.includes(sub.slug)),
		);
		if (activeTopicIndex !== -1) setOpenTopic(activeTopicIndex);
	}, [pathname, topics]);

	// Efecto para deshabilitar el scroll cuando el menú está abierto en dispositivos móviles
	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset"; // Limpia el estilo al desmontar o cambiar el estado
		};
	}, [isMenuOpen]);

	// Alterna la apertura de un tema en la lista de temas
	const toggleTopic = (index) =>
		setOpenTopic(openTopic === index ? null : index);

	// Alterna la visibilidad del menú en dispositivos móviles
	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<>
			{!isMenuOpen && (
				<HamburgerButton isOpen={isMenuOpen} toggleMenu={toggleMenu} /> // Botón para abrir el menú en móviles
			)}
			<nav
				className={`z-20 max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:h-screen max-lg:w-screen max-lg:bg-[#091625] max-lg:backdrop-blur-none lg:w-72 lg:min-w-72 lg:py-16 ${
					isMenuOpen ? "translate-x-0" : "-translate-x-full" // Controla la visibilidad del menú en móviles
				} transition-transform duration-300 ease-in-out max-lg:top-20 lg:translate-x-0`}
			>
				<HamburgerButton isOpen={isMenuOpen} toggleMenu={toggleMenu} /> {/* Botón de cierre del menú */}

				{/* Lista de temas con subtemas */}
				<ul className="max-h-[calc(100vh-5rem)] w-full overflow-y-auto rounded-lg border-l border-r border-t border-slate-500 max-lg:border-slate-700 bg-transparent shadow-lg max-lg:absolute max-lg:left-0 max-lg:top-20 max-lg:w-screen max-lg:rounded-none bg-slate-900 max-lg:backdrop-blur-none lg:mx-auto lg:max-w-md">
					{orderedData.map(({ name, subtopics }, index) => {
						const isOpen = openTopic === index; // Verifica si este tema está abierto
						return (
							<li
								key={name} // Índice como key para identificar el tema
								className="border-b border-gray-800 last:border-b-0"
							>
								{/* Botón para expandir/cerrar el tema */}
								<button
									type="button"
									className="flex w-full items-center justify-between border-b border-slate-500 max-lg:border-slate-700 px-4 py-4 text-left text-base font-medium text-slate-200 hover:bg-gray-800"
									onClick={() => toggleTopic(index)} // Alterna la visibilidad del subtema
								>
									<span>{name}</span>

									{/* Icono de flecha que rota cuando el tema está abierto */}
									<ChevronRight
										className={`transition-transform duration-500 ${
											isOpen ? "rotate-90" : "rotate-0"
										}`}
										size={20}
									/>
								</button>

								{/* Lista de subtemas, se despliega cuando el tema está abierto */}
								<div
									className={`overflow-hidden transition-[max-height] duration-500 ${
										isOpen ? "max-h-screen" : "max-h-0"
									}`}
								>
									<ul className="border-b border-slate-500 max-lg:border-slate-700 py-2 font-semibold">
										{subtopics.map(
											({ name, slug, id }) => (
												<Link
													key={id} // Id como key para el subtema
													href={slug}
												>
													<div
														className={`flex items-center py-2 pl-14 pr-6 ${
															pathname.includes(
																slug,
															)
																? "text-pink-400" // Indica si el subtema está activo
																: "text-slate-400"
														} text-[0.9rem] transition-colors duration-150 hover:bg-gray-700`}
													>
														<li className="relative list-disc">
															{name} {/* Nombre del subtema */}
														</li>
													</div>
												</Link>
											),
										)}
									</ul>
								</div>
							</li>
						);
					})}
				</ul>
			</nav>
		</>
	);
}

export default NavBarContent;
