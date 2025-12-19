import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="z-10 flex items-center gap-2 sm:gap-4">
      <Image
        src={logo}
        height="60"
        width="60"
        alt="The Wild Oasis logo"
        quality={100}
        className="h-10 w-10 sm:h-12 sm:w-12 md:h-[60px] md:w-[60px]"
      />
      <span className="text-primary-100 text-base sm:text-lg md:text-xl font-semibold">
        <span className="hidden sm:inline">The Wild Oasis</span>
        <span className="sm:hidden">Wild Oasis</span>
      </span>
    </Link>
  );
}

export default Logo;
