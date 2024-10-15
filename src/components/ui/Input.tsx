import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string; // Agregué este parámetro
}

export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
	const { className, ...restProps } = props; // Desestructuré los props

	return (
		<input
			className={twMerge(
				clsx(
					"mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#00ffff]",
					className, // Agregué className aquí
				),
			)}
			{...restProps} // Usé restProps en lugar de props
			ref={ref}
		/>
	);
});

export default Input;
