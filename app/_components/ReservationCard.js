import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="border-primary-800 flex flex-col sm:flex-row border">
      <div className="relative aspect-square w-full sm:w-40 sm:h-40 md:w-44 md:h-44 shrink-0">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="border-primary-800 sm:border-r object-cover"
        />
      </div>

      <div className="flex flex-grow flex-col px-4 sm:px-6 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-lg sm:text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="flex h-7 w-fit items-center rounded-sm bg-yellow-800 px-3 text-xs font-bold text-yellow-200 uppercase">
              past
            </span>
          ) : (
            <span className="flex h-7 w-fit items-center rounded-sm bg-green-800 px-3 text-xs font-bold text-green-200 uppercase">
              upcoming
            </span>
          )}
        </div>

        <p className="text-primary-300 text-sm sm:text-base md:text-lg">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="mt-auto flex flex-wrap items-baseline gap-3 sm:gap-5">
          <p className="text-accent-400 text-lg sm:text-xl font-semibold">${totalPrice}</p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-primary-300 text-base sm:text-lg">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="text-primary-400 sm:ml-auto text-xs sm:text-sm">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="border-primary-800 flex sm:w-[100px] flex-row sm:flex-col border-t sm:border-t-0 sm:border-l">
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group text-primary-300 border-primary-800 hover:bg-accent-600 hover:text-primary-900 flex flex-grow items-center justify-center gap-2 border-r sm:border-r-0 sm:border-b px-3 py-3 sm:py-0 text-xs font-bold uppercase transition-colors"
            >
              <PencilSquareIcon className="text-primary-600 group-hover:text-primary-800 h-5 w-5 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation bookingId={id} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ReservationCard;
