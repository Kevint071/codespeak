import ContentGrid from "@/components/ContentHome";
import contents from "@/data/contentData";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import BotonLuminoso from "@/components/ui/BotonLuminoso";
import H1 from "@/components/ui/H1";
import Link from "next/link";
import { clsx } from "clsx";

export default function Homepage() {
	// Componente principal de la página de inicio, muestra encabezado, botones y contenido dinámico.
	const value = 16; // Valor usado para definir la condición de estilo en el ícono de flecha hacia abajo.

	return (
		<main>
			<div className="container mx-auto px-4 pb-6 pt-12 text-center sm:pt-28 md:pt-28">
				<H1>Domina el Código, Transforma tu Carrera</H1>

				<p className="my-6 px-5 text-lg font-medium text-gray-300 md:px-7 lg:px-20 lg:text-2xl">
					Recursos, desafíos y un enfoque innovador para potenciar tu
					carrera.
				</p>

				{/* Sección con botones de navegación */}
				<div className="mx-auto my-12 flex max-w-lg flex-col items-center justify-center gap-x-8 gap-y-4 min-[353px]:flex-row sm:gap-y-0 sm:space-y-0 md:gap-x-12 lg:gap-x-16">
					<Link href={"/recursos/python/que-es-python"}>
						<BotonLuminoso isHoverEffect={true}>
							Empieza Ya
						</BotonLuminoso>
					</Link>

					<Link
						href={"/desafios"}
						className="flex flex-row items-center gap-x-2 rounded-2xl px-2 py-3 font-extrabold"
					>
						<button type="button" className="gradient-text">
							Desafíos
						</button>
						<MdKeyboardDoubleArrowRight color="#00ffff" size={20} />
					</Link>
				</div>

				<div className="my-4 mt-0 flex flex-col items-center text-xl font-semibold sm:mt-24 sm:text-xl md:text-2xl lg:text-3xl">
					<p className="text-slate-300">
						Aprende y Contribuye con Nosotros
					</p>

					{/* Ícono de flecha hacia abajo con animación de rebote y cambio de color basado en la variable 'value' */}
					<IoIosArrowDown
						className={clsx(
							"text-4xl md:text-4xl lg:text-5xl",
							"mt-16", // Márgenes
							"animate-[bounce_2s_ease-out_infinite]",
							{ "text-cyan-300": value > 10 },
							{ "text-cyan-500": value === 10 },
						)}
					/>
				</div>
			</div>

			<ContentGrid />
		</main>
	);
}
