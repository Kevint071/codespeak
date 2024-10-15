const HamburgerButton = ({ isOpen, toggleMenu }) => {
	return (
		<button
			type="button"
			className={`fixed left-7 max-sm:left-5 ${isOpen ? "top-5" : "top-[100px]"} z-50 p-2 text-white focus:outline-none lg:hidden`}
			onClick={toggleMenu}
			aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
		>
			<div className={`space-y-2 ${isOpen ? "max-sm:space-y-[8px]" : "max-sm:space-y-[6px]"}`}>
				<span
					className={`block h-0.5 w-7 bg-white transition-transform duration-300 ease-in-out max-sm:w-6 ${isOpen ? "translate-y-2.5 rotate-45" : ""}`}
				/>
				<span
					className={`block h-0.5 w-7 bg-white transition-opacity duration-300 ease-in-out max-sm:w-6 ${isOpen ? "opacity-0" : ""}`}
				/>
				<span
					className={`block h-0.5 w-7 bg-white transition-transform duration-300 ease-in-out max-sm:w-6 ${isOpen ? "-translate-y-2.5 -rotate-45" : ""}`}
				/>
			</div>
		</button>
	);
};

export default HamburgerButton;
