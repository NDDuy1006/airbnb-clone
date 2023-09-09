"use client";

import useCountries from "@/app/hooks/useCountry";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingItemCategory from "./ListingItemCategory";
import dynamic from "next/dynamic";
import Heading from "../Heading";

const Map = dynamic(() => import("../Map"),
  {
    ssr: false,
  }
);

interface IProps {
  user: SafeUser | null;
  category: {
    icon: IconType;
    label: string;
    description: string
  } | undefined;
  locationValue: string;
  guestCount: number;
  description: string;
  roomCount: number;
  bathroomCount: number;
  title: string;
};

const ListingItemInfo = ({
  user,
  category,
  locationValue,
  guestCount,
  description,
  roomCount,
  bathroomCount,
  title,
}: IProps) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;
  const location = getByValue(locationValue);

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold flex flex-row items-center gap-2">
            <div>Hosted by {user?.name}</div>
            <Avatar
              src={user?.image}
            />
          </div>
          <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
            <div>
              {guestCount} {guestCount < 2 ? "guest" : "guests" }
            </div>
            <div>
              {roomCount} {roomCount < 2 ? "room" : "rooms" }
            </div>
            <div>
              {bathroomCount} {bathroomCount < 2 ? "bathroom" : "bathrooms" }
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <Heading
            title={title}
            subtitle={`${location?.region}, ${location?.label}`}
            isListingItemInfo
          />
        </div>
      </div>
      <hr />
      {category && (
        <ListingItemCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  )
}

export default ListingItemInfo;