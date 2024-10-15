"use client";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HamburgerButton from "./HamburgerButton";

function NavBarContent({ topics }) {
	const [openTopic, setOpenTopic] = useState(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const activeTopicIndex = topics.findIndex(({ subtopics }) =>
			subtopics.some((sub) => pathname.includes(sub.slug)),
		);
		if (activeTopicIndex !== -1) setOpenTopic(activeTopicIndex);
	}, [pathname, topics]);

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMenuOpen]);

	const toggleTopic = (index) =>
		setOpenTopic(openTopic === index ? null : index);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<>
			{!isMenuOpen && (
				<HamburgerButton isOpen={isMenuOpen} toggleMenu={toggleMenu} />
			)}
			<nav
				className={`z-20 max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:h-screen max-lg:w-screen max-lg:bg-[#091625] max-lg:backdrop-blur-none lg:w-72 lg:min-w-72 lg:py-16 ${
					isMenuOpen ? "translate-x-0" : "-translate-x-full"
				} transition-transform duration-300 ease-in-out max-lg:top-20 lg:translate-x-0`}
			>
				<HamburgerButton isOpen={isMenuOpen} toggleMenu={toggleMenu} />

				<ul className="max-h-[calc(100vh-5rem)] w-full overflow-y-auto rounded-lg border-l border-r border-t border-slate-500 max-lg:border-slate-700 bg-transparent shadow-lg max-lg:absolute max-lg:left-0 max-lg:top-20 max-lg:w-screen max-lg:rounded-none bg-slate-900 max-lg:backdrop-blur-none lg:mx-auto lg:max-w-md">
					{topics.map(({ name, subtopics }, index) => {
						const isOpen = openTopic === index;
						return (
							<li
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={index}
								className="border-b border-gray-800 last:border-b-0"
							>
								<button
									type="button"
									className="flex w-full items-center justify-between border-b border-slate-500 max-lg:border-slate-700 px-4 py-4 text-left text-base font-medium text-slate-200 hover:bg-gray-800"
									onClick={() => toggleTopic(index)}
								>
									<span>{name}</span>

									<ChevronRight
										className={`transition-transform duration-500 ${
											isOpen ? "rotate-90" : "rotate-0"
										}`}
										size={20}
									/>
								</button>

								<div
									className={`overflow-hidden transition-[max-height] duration-500 ${
										isOpen ? "max-h-screen" : "max-h-0"
									}`}
								>
									<ul className="border-b border-slate-500 max-lg:border-slate-700 py-2 font-semibold">
										{subtopics.map(
											({ name, slug }, subIndex) => (
												<Link
													// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
													key={subIndex}
													href={slug}
												>
													<div
														className={`flex items-center py-2 pl-14 pr-6 ${
															pathname.includes(
																slug,
															)
																? "text-pink-400"
																: "text-slate-400"
														} text-[0.9rem] transition-colors duration-150 hover:bg-gray-700`}
													>
														<li className="relative list-disc">
															{name}
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
