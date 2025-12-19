import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="border-primary-800 flex flex-col sm:flex-row border">
      <div className="relative h-64 sm:h-full sm:w-40 md:w-48 lg:w-56 xl:w-64 shrink-0">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="border-primary-800 sm:border-r object-cover"
        />
      </div>

      <div className="flex-grow">
        <div className="bg-primary-950 px-4 sm:px-7 pt-4 sm:pt-5 pb-3 sm:pb-4">
          <h3 className="text-accent-500 mb-2 sm:mb-3 text-xl sm:text-2xl font-semibold">
            Cabin {name}
          </h3>

          <div className="mb-2 flex items-center gap-2 sm:gap-3">
            <UsersIcon className="text-primary-600 h-4 w-4 sm:h-5 sm:w-5" />
            <p className="text-primary-200 text-sm sm:text-base md:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex items-baseline justify-end gap-2 sm:gap-3">
            {discount > 0 ? (
              <>
                <span className="text-2xl sm:text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="text-primary-600 text-sm sm:text-base font-semibold line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl sm:text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-200 text-sm sm:text-base">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t-primary-800 border-t text-right">
          <Link
            href={`/cabins/${id}`}
            className="border-primary-800 hover:bg-accent-600 hover:text-primary-900 inline-block border-l px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base transition-all"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
