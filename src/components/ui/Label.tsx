import { clsx } from "clsx";

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ children, className, ...props }: Props) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: This is a component that dont need a input because it imported from another component
<label
      className={clsx("block text-sm font-medium text-gray-300", className)}
      {...props}
    >
      {children}
    </label>
  );
}

export default Label;
