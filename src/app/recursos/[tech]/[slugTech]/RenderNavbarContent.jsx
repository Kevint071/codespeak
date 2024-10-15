"use client";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBarUl = ({ topics }) => {
	const [openTopic, setOpenTopic] = useState(null);
	const pathname = usePathname();

	useEffect(() => {
		const activeTopicIndex = topics.findIndex(({ subtopics }) =>
			subtopics.some((sub) => pathname.includes(sub.slug)),
		);
		if (activeTopicIndex !== -1) setOpenTopic(activeTopicIndex);
	}, [pathname, topics]);

	const toggleTopic = (index) =>
		setOpenTopic(openTopic === index ? null : index);

	return (
		<ul className="w-full overflow-hidden rounded-lg border-l border-r border-t border-slate-500 bg-transparent shadow-lg max-lg:absolute max-lg:left-0 max-lg:top-20 max-lg:h-screen max-lg:w-screen max-lg:bg-slate-900 max-lg:backdrop-blur-none lg:mx-auto lg:max-w-md">
			{topics.map(({ name, subtopics }, index) => {
				const isOpen = openTopic === index;
				return (
					<li
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						className="border-b border-gray-800 last:border-b-0"
					>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							className="flex w-full items-center justify-between border-b border-slate-500 px-4 py-4 text-left text-base font-medium text-slate-200 hover:bg-gray-800"
							onClick={() => toggleTopic(index)}
						>
							<span>{name}</span>

							<ChevronRight
								className={`transition-transform duration-500 ${isOpen ? "rotate-90" : "rotate-0"}`}
								size={20}
							/>
						</button>

						<div
							className={`overflow-hidden transition-[max-height] duration-500 ${isOpen ? "max-h-screen" : "max-h-0"}`}
						>
							<ul className="border-b border-slate-500 py-2 font-semibold">
								{subtopics.map(({ name, slug }, subIndex) => (
									<Link
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={subIndex}
										href={slug}
									>
										<div
											className={`flex items-center py-2 pl-14 pr-6 ${
												pathname.includes(slug)
													? "text-pink-400"
													: "text-slate-400"
											} text-[0.9rem] transition-colors duration-150 hover:bg-gray-700`}
										>
											<li className="relative list-disc">
												{name}
											</li>
										</div>
									</Link>
								))}
							</ul>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

export default NavBarUl;
