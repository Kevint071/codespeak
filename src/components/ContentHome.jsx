import cards from "@/data/contentData";

export default function ContentGrid() {
	return (
		<section className="w-full px-10 py-8">
			<div className="mx-auto max-w-7xl">
				<div className="mx-auto grid gap-x-14 gap-y-10 max-lg:gap-x-7 md:grid-cols-2 lg:grid-cols-3">
					{cards.map((card) => (
						<Card key={card.title} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}

function Card({ title, description, icon }) {
	return (
		<div className="group relative overflow-hidden rounded-lg border border-gray-800 bg-black/50 p-6 transition-all duration-300 ease-in-out hover:border-gray-700 hover:shadow-lg hover:shadow-cyan-500/20">
			<div className="relative z-10">
				<div className="mb-4 flex items-center">
					<span className="mr-3 text-4xl">{icon}</span>
					<h3 className="text-base font-semibold text-white md:text-lg lg:text-xl">
						{title}
					</h3>
				</div>
				<p className="mb-4 text-gray-400 transition-opacity duration-300 ease-in-out group-hover:text-gray-300">
					{description}
				</p>
			</div>
			<div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-blue-400/20 to-cyan-400/20 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
			<div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-blue-400 to-cyan-400 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-10" />
			<div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-pink-500/90 via-blue-400/90 to-cyan-400/90 transition-all duration-300 ease-in-out group-hover:w-full" />
		</div>
	);
}
