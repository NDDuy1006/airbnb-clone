"use client"

import useCountries from "@/app/hooks/useCountry";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    };

    return "Anywhere"
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1
      };

      return `${diff} Days`
    }

    return "Any Week"
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    };

    return "Add Guests"
  }, [guestCount]);

  return (
    <div
      className="search-wrapper"
      onClick={searchModal.onOpen}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">
        {locationLabel}
        </div>
        <div className="search-location">
          {durationLabel}
        </div>
        <div className="search-guest">
          <div className="hidden sm:block">
            {guestLabel}
          </div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Search;