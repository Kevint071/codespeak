"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input, Label, MessageError } from "@/components/ui";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface PasswordInputProps {
	id: string; // ID único del campo
	label: string; // Etiqueta visible
	placeholder?: string; // Placeholder del input
	register: UseFormRegisterReturn; // Registro de React Hook Form
	error?: FieldError; // Error asociado al campo
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
	id,
	label,
	placeholder = "••••••••",
	register,
	error,
}) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const toggleVisibility = () => setIsVisible((prevState) => !prevState);

	return (
		<div className="space-y-2">
			<Label htmlFor={id}>{label} <span className="text-destructive">*</span></Label>
			<div className="relative">
				<Input
					id={id}
					className="pe-9"
					autoComplete="new-password"
					placeholder={placeholder}
					data-testid={id}
					type={isVisible ? "text" : "password"}
					{...register} // Registro de React Hook Form
				/>
				<button
					className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
					type="button"
					onClick={toggleVisibility}
					aria-label={isVisible ? "Hide password" : "Show password"}
					aria-pressed={isVisible}
					aria-controls="password"
				>
					{isVisible ? (
						<EyeOff size={16} strokeWidth={2} aria-hidden="true" />
					) : (
						<Eye size={16} strokeWidth={2} aria-hidden="true" />
					)}
				</button>
			</div>

			{error && (
				<MessageError data-testid={`${id}-error`}>
					{error.message}
				</MessageError>
			)}
		</div>
	);
};
