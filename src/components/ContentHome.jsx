import Image from "next/image";

function ContentHome({ content }) {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-x-4 gap-y-5 sm:gap-x-8 sm:px-0 sm:py-10 md:flex-row md:gap-y-0 md:py-0 lg:max-w-4xl lg:gap-x-16 xl:max-w-6xl">
      <div className="flex w-3/4 flex-col justify-center space-y-6 px-4 text-center sm:pl-6">
        <h2 className="text-xl font-bold text-cyan-100 md:text-2xl">
          {content.title}
        </h2>
        <p className="max-w-4xl text-base text-gray-300 sm:text-base lg:text-xl">
          {content.text}
        </p>
      </div>
      <div className="flex w-1/2 justify-center overflow-hidden rounded-lg">
        <Image
          src={content.image}
          alt={content.alt}
          className="h-full w-full py-8 sm:w-3/4 sm:py-0"
        />
      </div>
    </div>
  );
}

export default ContentHome;
