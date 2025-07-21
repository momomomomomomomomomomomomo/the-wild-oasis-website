import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
async function CabinList({ filter }) {
  const cabins = await getCabins();

  if (!cabins.length) return null;
  let currentCabins = cabins;
  if (filter === "small") {
    currentCabins = currentCabins.filter((cabin) => cabin.maxCapacity <= 3);
  }
  if (filter === "medium") {
    currentCabins = currentCabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
    );
  }
  if (filter === "large") {
    currentCabins = currentCabins.filter((cabin) => cabin.maxCapacity >= 8);
  }
  if (!currentCabins.length)
    return (
      <div className="grid align-middle sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
        <h2 className="text-accent-400 col-span-full row-span-full min-h-screen text-center text-4xl font-semibold">
          There&apos;s no {filter} Cabins RN
        </h2>
      </div>
    );
  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {currentCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
