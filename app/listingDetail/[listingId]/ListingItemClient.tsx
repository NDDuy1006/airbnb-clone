"use client";

import Container from "@/app/components/Container";
import ListingItemHeader from "@/app/components/ListingItem/ListingItemHeader";
import ListingItemInfo from "@/app/components/ListingItem/ListingItemInfo";
import ListingItemReservation from "@/app/components/ListingItem/ListingItemReservation";
import { categories } from "@/app/components/Navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import axios from "axios";
import { differenceInDays, eachDayOfInterval, differenceInCalendarDays, setDate } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

const initDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection"
}

interface IProps {
  reservations?: SafeReservation[];
  listingItem: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
};

const ListingItemClient = (
  {
    listingItem,
    reservations = [],
    currentUser
  }: IProps
) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listingItem.price);
  const [dateRange, setDateRange] = useState<Range>(initDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    };

    setIsLoading(true);

    axios.post("/api/reservations", {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listingItem?.id
    })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initDateRange);
        // Redirect to /trips
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [totalPrice, dateRange, listingItem?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listingItem.price) {
        setTotalPrice(dayCount * listingItem.price);
      } else {
        setTotalPrice(listingItem.price)
      }
    }
  }, [dateRange, listingItem.price])

  const category = useMemo(() => {
    return categories.find((item) =>
      item.label === listingItem.category)
  }, [listingItem.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingItemHeader
            title={listingItem.title}
            imageSrc={listingItem.imageSrc}
            locationValue={listingItem.locationValue}
            id={listingItem.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingItemInfo
              user={listingItem.user}
              title={listingItem.title}
              category={category}
              description={listingItem.description}
              guestCount={listingItem.guestCount}
              roomCount={listingItem.roomCount}
              bathroomCount={listingItem.bathroomCount}
              locationValue={listingItem.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingItemReservation
                price={listingItem.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingItemClient;