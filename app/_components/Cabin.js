import TextExpander from "@/app/_components/TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  return (
    <div className="border-primary-800 mb-12 sm:mb-16 md:mb-24 grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-6 sm:gap-10 lg:gap-20 border px-4 sm:px-6 md:px-10 py-4 sm:py-3">
      <div className="relative aspect-square h-72 sm:h-96 md:h-[28rem] lg:h-auto lg:-translate-x-3 lg:scale-[1.15]">
        <Image
          src={image}
          fill
          className="object-cover"
          alt={`Cabin ${name}`}
        />
      </div>

      <div>
        <h3 className="text-accent-100 bg-primary-950 mb-4 sm:mb-5 lg:w-[150%] lg:translate-x-[-254px] p-4 sm:p-6 pb-1 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black">
          Cabin {name}
        </h3>

        <p className="text-primary-300 mb-6 sm:mb-8 md:mb-10 text-base sm:text-lg">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="mb-5 sm:mb-7 flex flex-col gap-3 sm:gap-4">
          <li className="flex items-center gap-2 sm:gap-3">
            <UsersIcon className="text-primary-600 h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-base sm:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex items-center gap-2 sm:gap-3">
            <MapPinIcon className="text-primary-600 h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-base sm:text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex items-center gap-2 sm:gap-3">
            <EyeSlashIcon className="text-primary-600 h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-base sm:text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
