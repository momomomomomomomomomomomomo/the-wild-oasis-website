import Link from "next/link";
import { auth } from "@/app/_lib/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-base sm:text-lg md:text-xl">
      <ul className="flex items-center gap-4 sm:gap-8 md:gap-12 lg:gap-16">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user ? (
            <Link
              href="/account"
              className="hover:text-accent-400 flex items-center gap-2 sm:gap-4 transition-colors"
            >
              <div className="relative h-7 w-7 sm:h-8 sm:w-8 rounded-full overflow-hidden bg-accent-500 flex items-center justify-center text-primary-800 font-semibold text-sm">
                {session.user.image ? (
                  <Image
                    referrerPolicy="no-referrer"
                    alt={session.user.name}
                    className="rounded-full object-cover"
                    src={session.user.image}
                    fill
                    sizes="32px"
                  />
                ) : (
                  <span>{session.user.name?.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <span className="hidden sm:inline">Guest area</span>
              <span className="sm:hidden">Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              <span className="hidden sm:inline">Guest area</span>
              <span className="sm:hidden">Guest area</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
