import ProfileContentManager from "@/app/profile/[userID]/ProfileContentManager";

export default function ProfilePage() {
	// para fondo en etiqueta <main>  bg-white/10 backdrop-blur-md
	return (

		<div className="text-white">
			<div className="container mx-auto px-4 py-8 lg:px-8">
				<ProfileContentManager />
			</div>
		</div>
	);
}
