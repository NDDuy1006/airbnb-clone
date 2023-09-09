"use client";

import useCountries from "@/app/hooks/useCountry";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface IProps { 
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
};

const ListingItemHeader = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser
}: IProps) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <div className="lg:hidden">
        <Heading
          title={title}
          subtitle={`${location?.region}, ${location?.label}`}
        />
      </div>
      <div className="w-full h-[60vh] lg:h-[85vh] overflow-hidden rounded-xl relative">
        <Image
          alt="image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
        <div className="listing-item-heading-wrapper">
          <Heading
            title={title}
            subtitle={`${location?.region}, ${location?.label}`}
            isListingItemTitle
          />
        </div>
      </div>
    </>
  )
}

export default ListingItemHeader