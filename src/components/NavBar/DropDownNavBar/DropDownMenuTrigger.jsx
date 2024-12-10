import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export default function DropDownMenuTrigger({ menuOpen }) {
	const { data: session } = useSession();
	const [imageProfileUrl, setImageProfileUrl] = useState(null);
	const user_name = session ? session.user.name : "";
	const userID = session ? session.user.id : "";

	const letras_user_name = user_name
		.split(" ")
		.map((word) => word[0])
		.join("");
	
	const cantidad_letras = user_name.split(" ").length;

	useEffect(() => {
		const fetchImage = async () => {
			const url = await getUrlImage(userID);
			setImageProfileUrl(url);
		};
		fetchImage();
	});

	return (
		<DropdownMenuTrigger className="p-2">
			{session ? (
				<Avatar className="text-white">
					<AvatarImage
						src={imageProfileUrl}
						alt="Profile"
						className="h-full w-full object-cover"
					/>
					<AvatarFallback className={`${cantidad_letras > 1 ? "text-xs" : "text-sm"} font-semibold bg-cyan-600`}>{letras_user_name}</AvatarFallback>
				</Avatar>
			) : menuOpen ? (
				<IoClose color="white" size={24} />
			) : (
				<RxHamburgerMenu color="white" size={24} />
			)}
		</DropdownMenuTrigger>
	);
}

async function getUrlImage(userID) {
	if (!userID) {
		return null;
	}
	const response = await fetch(`/api/profile/accountInfo/${userID}`);
	const data = await response.json();
	return data.imageProfile;
}
