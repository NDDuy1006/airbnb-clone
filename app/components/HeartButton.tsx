"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavourite from "../hooks/useFavourite";

interface IProps { 
  listingId: string;
  currentUser?: SafeUser | null;
};

const HeartButton = ({ listingId, currentUser }: IProps) => {
  const { hasFavourited, toggleFavourite } = useFavourite({
    listingId,
    currentUser
  });

  return (
    <div
      onClick={toggleFavourite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavourited ? "fill-rose-400" : "fill-neutral-500/70"}
      />
    </div>
  )
}

export default HeartButton