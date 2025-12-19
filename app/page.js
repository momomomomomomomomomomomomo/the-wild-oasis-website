import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png";
console.log(process.env.NEXTAUTH_SECRET);
export default function Page() {
  return (
    <main className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        priority
        alt="Mountains and forests with two cabins"
        className="absolute object-cover object-top"
      />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-primary-50 mb-6 sm:mb-8 md:mb-10 text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 text-primary-800 hover:bg-accent-600 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold transition-all inline-block"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
