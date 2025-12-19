import Link from "next/link";
import { auth } from "@/app/_lib/auth";


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
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 flex items-center gap-2 sm:gap-4 transition-colors"
            >
              <div className="relative h-8 w-8 rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={session.user.image}
                  alt={session.user.name}
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="hidden sm:inline">Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              <span className="hidden sm:inline">Guest area</span>
              <span className="sm:hidden">Account</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
