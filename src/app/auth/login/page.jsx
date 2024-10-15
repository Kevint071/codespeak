import Link from "next/link";
import FormLogin from "@/app/auth/login/FormLogin";
import {
	RegistroGoogle,
	RegistroGitHub,
} from "@/components/ui/RegistrosAlternativos";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export const metadata = {
	title: "Iniciar Sesión",
	description: "Descripción de mi página",
};

async function SignInPage() {
	const session = await getServerSession();
	if (session) {
		return redirect("/");
	}

	return (
		<main className="flex min-h-[calc(100vh-7rem)] flex-grow items-center justify-center p-8">
			<div className="w-full max-w-md space-y-8">
				<FormLogin />

				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-600" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="bg-[#000000] px-2 text-gray-400">
								O inicia sesión con
							</span>
						</div>
					</div>

					<div className="mt-6 grid grid-cols-2 gap-3">
						<RegistroGoogle srOnly={"Iniciar sesión con Google"} />
						<RegistroGitHub srOnly={"Iniciar sesión con GitHub"} />
					</div>
				</div>

				<p className="mt-6 text-center text-sm text-gray-400">
					¿No tienes una cuenta?{" "}
					<Link
						href="/auth/signUp"
						className="font-medium text-[#00ffff] hover:text-[#00cccc]"
					>
						Regístrate
					</Link>
				</p>
			</div>
		</main>
	);
}

export default SignInPage;
