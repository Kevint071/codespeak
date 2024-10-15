import FormSignUp from "@/app/auth/signUp/FormSignUp";
import {
  RegistroGoogle,
  RegistroGitHub,
} from "@/components/ui/RegistrosAlternativos";
import Link from "next/link";

export const metadata = {
  title: "Regístrate"
}

function SignUpPage() {
  return (
    <main className="flex min-h-[calc(100vh-7rem)] flex-grow items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        <FormSignUp />
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-black px-2 text-gray-400">
                O regístrate con
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <RegistroGoogle srOnly={"Registrarse con Google"} />
            <RegistroGitHub srOnly={"Registrarse con GitHub"} />
          </div>
        </div>

        <p className="mt-2 text-center text-sm text-gray-400">
          ¿Tienes algún problema para registrarte? Contáctanos para asistencia.
        </p>

        <p className="mt-6 text-center text-sm text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-[#00ffff] hover:text-[#00cccc]"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}

export default SignUpPage;
