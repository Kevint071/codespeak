function MainContentSkeleton() {
	return (
		<main className="mx-4 min-h-[calc(100vh-5rem)] w-full">
			<p className="mx-auto w-full animate-pulse py-10 sm:w-[500px] md:w-[690px] lg:w-[600px] xl:w-[768px]">Debido a el uso de la versión <strong>Free</strong> de Render con Strapi, esta solicitud puede durar hasta 2 minutos solo la primera vez</p>
			<div className="mx-auto w-full animate-pulse sm:w-[500px] md:w-[690px] lg:w-[600px] xl:w-[768px]">
				{/* Skeleton para el título */}
				<div className="mb-10 mt-1 h-8 w-2/4 rounded bg-[#ff6f91]/70" />

				{/* Skeleton para los párrafos simulados */}
				<div className="mb-8 space-y-4">
					<div className="h-6 w-4/5 rounded bg-slate-300" />
					<div className="h-6 w-3/5 rounded bg-slate-300" />
					<div className="h-6 w-2/3 rounded bg-slate-300" />
				</div>

				{/* Skeleton para el bloque de código (bloque completo) */}
				<div className="mb-8 h-32 w-full rounded-md bg-[#00bcd4]/50" />

				{/* Skeleton para otro contenido principal */}
				<div className="space-y-4">
					<div className="h-5 w-5/6 rounded bg-slate-300" />
					<div className="h-5 w-4/6 rounded bg-slate-300" />
				</div>
			</div>
		</main>
	);
}

export default MainContentSkeleton;
