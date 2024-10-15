interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isHoverEffect?: boolean;
}

export function BotonLuminoso({ children, isHoverEffect = false, ...props }: Props) {
  return (
    <button
      className="flex min-w-[120px] cursor-pointer touch-manipulation select-none items-center justify-center rounded-full border-0 bg-[linear-gradient(225deg,hsla(180,100%,50%,1)_10%,hsla(330,100%,71%,1)_60%)] bg-[length:100%_100%] bg-[position:0%_0%] p-[3px] shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] transition-all duration-200 hover:bg-[length:200%_200%] hover:bg-[position:100%_100%] active:scale-90"
      {...props}
    >
      <span
        className={`h-full w-full rounded-full bg-black px-4 py-4 font-bold text-white transition-colors duration-500 ${isHoverEffect ? "hover:bg-transparent" : "hover:bg-black"} `}
      >
        {children}
      </span>
    </button>
  );
}

export default BotonLuminoso;
