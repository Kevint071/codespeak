import { Input, Label, MessageError } from "@/components/ui";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useCharacterLimit } from "@/hooks/use-character-limit";

interface TextInputProps {
	label: string; // Etiqueta visible
	id: string; // ID único del campo
	placeholder?: string; // Placeholder del input
	register: UseFormRegisterReturn; // Registro de React Hook Form
	error?: FieldError; // Error asociado al campo
	maxLength?: number; // Longitud máxima permitida (opcional)
}

export const DataUserInput: React.FC<TextInputProps> = ({
	label,
	id,
	placeholder = "",
	register,
	error,
	maxLength = 40, // Valor predeterminado de longitud máxima
}) => {
	const {
		value,
		characterCount,
		handleChange,
		maxLength: limit,
	} = useCharacterLimit({ maxLength });

	// Extraemos las propiedades específicas del registro
	const { onChange: registerOnChange, ...restRegister } = register;

	return (
		<div className="space-y-2">
			<Label htmlFor={id}>{label} <span className="text-destructive">*</span></Label>
			<div className="relative">
				<Input
					id={id}
					className="peer pe-14"
					type="text"
					placeholder={placeholder}
					data-testid={id}
					value={value}
					maxLength={maxLength}
					// Combinamos las funciones de onChange
					onChange={(e) => {
						registerOnChange(e); // React Hook Form
						handleChange(e); // Lógica personalizada
					}}
					aria-describedby={`${id}-character-count`}
					{...restRegister} // Resto de las propiedades del registro
				/>
				<output
					id={`${id}-character-count`}
					className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs tabular-nums text-muted-foreground peer-disabled:opacity-50"
					aria-live="polite"
				>
					{characterCount}/{limit}
				</output>
			</div>

			{error && (
				<MessageError data-testid={`${id}-error`}>
					{error.message}
				</MessageError>
			)}
		</div>
	);
};
