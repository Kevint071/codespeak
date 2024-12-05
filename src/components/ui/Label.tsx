"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const Label = React.forwardRef<
	HTMLLabelElement,
	React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
	// biome-ignore lint/a11y/noLabelWithoutControl: It's a component reusable. Don't need a control
	<label
		ref={ref}
		className={cn(
			"text-sm font-medium leading-4 text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
			className,
		)}
		{...props}
	/>
));
Label.displayName = "Label";

export { Label };
