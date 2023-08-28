"use client"

import useSearchModal from "@/app/hooks/useSearchModal";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();

  return (
    <div
      className="search-wrapper"
      onClick={searchModal.onOpen}
    >
      <div className="flex flex-row items-center justif-between">
        <div className="text-sm font-semibold px-6">
        Any Week
        </div>
        <div className="search-location">
          Any where
        </div>
        <div className="search-guest">
          <div className="hidden sm:block">Add Guests</div>
          <div
            className="p-2 bg-rose-500 rounded-full text-white"
          >
            <BiSearch size={18} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Search;