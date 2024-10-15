import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { Pencil } from "lucide-react";
import { Check } from "lucide-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isEditing: boolean;
}

export function BotonEditCheck({ className, isEditing, ...props }: Props) {
	return (
		<button
			type="button"
			className={twMerge(
				clsx("ml-2 text-cyan-400 hover:text-pink-500", className),
			)}
			{...props}
		>
			<div className="w-8 flex justify-center">{isEditing ? <Check size={24} /> : <Pencil size={16} />}</div>
		</button>
	);
}
