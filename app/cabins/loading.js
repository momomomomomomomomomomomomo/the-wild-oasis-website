import Spinner from "@/app/_components/Spinner.js";
export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-primary-200 text-xl">Loading Cabin data...</p>
    </div>
  );
}
