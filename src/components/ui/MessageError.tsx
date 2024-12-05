import { clsx } from "clsx";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {}

export function MessageError({ children, className, ...props }: Props) {
	return (
		<p
			className={clsx("mt-2 text-xs text-[#ff69b4]", className)}
			// biome-ignore lint/a11y/useSemanticElements: Role alert is used for accessibility
			role="alert"
			aria-live="polite"
			{...props}
		>
			{children}
		</p>
	);
}

export default MessageError;
