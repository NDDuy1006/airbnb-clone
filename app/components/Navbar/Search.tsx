"use client"

import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div
      className="search-wrapper"
    >
      <div
        className="flex flex-row items-center justif-between"
      >
        <div
          className="text-sm font-semibold px-6"
        >
        Any Week
        </div>
        <div
          className="search-location"
        >
          Any where
        </div>
        <div
          className="search-guest"
        >
          <div className="hidden sm:block">Add Guests</div>
          <div
            className="
              p-2
              bg-rose-500
              rounded-full
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Search;