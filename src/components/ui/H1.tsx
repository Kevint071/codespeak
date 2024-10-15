import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {}

export function H1({ children, className, ...props }: Props) {
  return (
    <h1
      className={twMerge(
        clsx(
          "gradient-text my-4 animate-[fade-in_1s_ease-in_forwards] px-5 py-5 text-3xl font-bold md:px-0 md:text-4xl lg:py-5 lg:text-5xl xl:text-6xl",
          className,
        ),
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export default H1;
