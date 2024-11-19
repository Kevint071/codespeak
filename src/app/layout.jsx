import { Poppins } from "next/font/google";
import NavBar from "@/components/NavBar/NavBar";
import AnimatedBackground from "@/components/AnimatedBackground";
import "./globals.css";
import Providers from "@/app/Providers";

export const metadata = {
  title: "CodeSpeak",
  description: "Recursos de Programación",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body className={`antialiased ${poppins.className}`}>
        <AnimatedBackground />
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
