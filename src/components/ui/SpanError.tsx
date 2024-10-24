import { clsx } from "clsx";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {}

export function SpanError({ children, className, ...props }: Props) {
  return (
    <span className={clsx("text-xs text-red-500 font-medium", className)} {...props}>
      {children}
    </span>
  );
}

export default SpanError;
