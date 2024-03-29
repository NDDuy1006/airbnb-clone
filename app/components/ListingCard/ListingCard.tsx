"use client"

import useCountries from "@/app/hooks/useCountry";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";


interface IProps {
  currentUser?: SafeUser | null;
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
};

const ListingCard = ({
  currentUser,
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = ""
}: IProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId)
    }, [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    };

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    };

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);
    const currentDate = new Date();

    const isReservationExpired = endDate < currentDate;

    return {
      formatDate: `${format(startDate, 'PP')} - ${format(endDate, 'PP')}`,
      isReservationExpired
    }
  }, [reservation]);
  
  return (
    <div
      onClick={() => router.push(`/listingDetail/${data.id}`)}  
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing Item"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
            quality={60}
          />
          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate?.formatDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">
              per night
            </div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={reservationDate?.isReservationExpired}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default ListingCard;