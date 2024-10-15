import ImageNotFound from "@/assets/Not-found.png";
import Image from "next/image";
import Link from "next/link";

function notFound() {
  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col items-center justify-center">
      <Image src={ImageNotFound} className="w-60 sm:w-72 md:w-80 lg:w-96" />
      <p className="text-2xl font-bold text-cyan-100 sm:text-3xl xl:text-5xl">
        Ups, este sitio no existe
      </p>

      <Link href="/" className="h-20 w-40 py-5 text-[#ff69b4]">
        <button type="button" className="bg-custom-gradient m-0 h-12 w-full rounded-full px-0 text-lg font-bold text-white sm:h-14 sm:p-1 sm:my-3 sm:text-xl md:my-6">
          Regresar
        </button>
      </Link>
    </div>
  );
}

export default notFound;
