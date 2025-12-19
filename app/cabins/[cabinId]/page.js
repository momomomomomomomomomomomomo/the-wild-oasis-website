import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";

import Image from "next/image";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const pageParams = await params;
  const { name } = await getCabin(pageParams.cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="mx-auto mt-4 sm:mt-6 md:mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-accent-400 mb-6 sm:mb-8 md:mb-10 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
