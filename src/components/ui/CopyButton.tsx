"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  code: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ code, className, ...props }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      type="button"
      onClick={copyToClipboard}
      className={twMerge(
        clsx(
          "flex items-center space-x-1 rounded bg-gray-700 px-2 py-1 text-sm text-gray-300 transition-colors hover:bg-gray-600",
          className
        )
      )}
      {...props}
    >
      {copied ? (
        <Check size={16} className="text-green-400" />
      ) : (
        <Copy size={16} />
      )}
    </button>
  );
};