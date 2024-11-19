"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { TbFileTypeSql } from "react-icons/tb";
import { FaPython, FaReact, FaHtml5 } from "react-icons/fa6";
import { RiJavascriptFill, RiTailwindCssFill } from "react-icons/ri";

const languages = [
	{ name: "Python", icon: FaPython, link: "python/por-que-aprender-python", color: "#34769B" },
	{ name: "JavaScript", icon: RiJavascriptFill, link: "javascript/que-es-javascript", color: "#F7DF1E" },
	{ name: "React", icon: FaReact, link: "react", color: "#61DAFB" },
	{ name: "HTML", icon: FaHtml5, link: "html", color: "#E34F26" },
	{ name: "Tailwind CSS", icon: RiTailwindCssFill, link: "tailwind-css", color: "#06B6D4" },
	{ name: "SQL", icon: TbFileTypeSql, link: "sql", color: "#6495ED" },
];

export default function NavbarResources() {
	const [isOpen, setIsOpen] = useState(false);
	const timeoutRef = useRef(null);

	const handleMouseEnter = () => {
		clearTimeout(timeoutRef.current);
		setIsOpen(true);
	};

	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => {
			setIsOpen(false);
		}, 250);
	};

	const clickLink = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return (
		<div className="relative" onMouseLeave={handleMouseLeave}>
			<button
				type="button"
				className="flex transform items-center space-x-1 transition-all duration-300 max-md:transform max-md:border-b-2 max-md:border-slate-500 max-md:hover:scale-105 md:hover:text-cyan-300"
				onMouseEnter={handleMouseEnter}
			>
				<span>Recursos</span>
				<ChevronDown
					className={`h-4 w-4 transition-all ${isOpen ? "rotate-180 text-cyan-300" : "rotate-0"}`}
				/>
			</button>

			{isOpen && (
				<div
					className="absolute left-0 top-full z-50 mt-5 w-96 rounded-md border border-gray-700 bg-gray-900 p-4 shadow-lg max-lg:w-80"
					onMouseEnter={handleMouseEnter}
				>
					<div className="grid grid-cols-2 gap-4 max-lg:gap-0 max-lg:text-xs">
						{languages.map((lang) => {
							const IconComponent = lang.icon;
							return (
								<Link
									onClick={clickLink}
									key={lang.name}
									href={`/recursos/${lang.link}`}
									className="flex items-center space-x-3 rounded-md p-3 text-white transition-colors duration-100 hover:bg-gray-800 hover:text-cyan-300"
								>
									<IconComponent className="max-md:hidden md:w-6 md:h-6 lg:w-7 lg:h-7" color={lang.color} />
									<span>{lang.name}</span>
								</Link>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
