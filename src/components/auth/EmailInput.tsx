import { Input, Label, MessageError } from "@/components/ui";
import { Mail } from "lucide-react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface EmailInputProps {
  register: UseFormRegisterReturn; // Registro de react-hook-form
  error?: FieldError; // Error asociado al campo
}

export const EmailInput: React.FC<EmailInputProps> = ({ register, error }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Correo electrónico <span className="text-destructive">*</span></Label>
      <div className="relative">
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="tu@ejemplo.com"
          data-testid="email"
          className={`${error ? "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20" : ""}`}
          {...register}
        />
        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Mail size={16} strokeWidth={2} color={error ? "#ff69b4" : "#00ffff"} aria-hidden="true" />
        </div>
      </div>
      {error && (
        <MessageError data-testid="email-error">
          {error.message}
        </MessageError>
      )}
    </div>
  );
};
