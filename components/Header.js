import Image from "next/image";
import { useRouter } from "next/dist/client/router";

import { useState } from "react";

import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UsersIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRangePicker } from "react-date-range";


const Header = ({placeholder}) => {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const router = useRouter();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const resetInput = () => {
    setSearchInput("");
  }

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests
      }
    });
  }

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/* Left block - Logo */}
      <div onClick={() => router.push("/")} className="relative flex items-center h-10 cursor-pointer my-auto mr-4">
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Middle block - Search */}
      <div className="flex items-center border-2 rounded-full py-2 md:shadow-sm justify-center">
        <input
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          className="flex-grow pl-5 pr-5 bg-transparent outline-none
        text-sm text-gray-600 placeholder-gray-400 overflow-hidden"
          type="text"
          placeholder={ placeholder || "Start your search"}
        />

        <SearchIcon
          className="hidden md:inline-flex h-8 bg-red-400 text-white 
        rounded-full p-2 cursor-pointer mr-5"
        />
      </div>

      {/* Right block */}
      <div
        className="flex items-center space-x-4 justify-end
      text-gray-500"
      >
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className=" h-6 cursor-pointer" />

        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto mt-6">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#fd5b61"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>

            <UsersIcon className="h-5" />

            <input
              value={numberOfGuests}
              onChange={(event) => setNumberOfGuests(event.target.value)}
              min={1}
              type="number"
              className="w-12 pl-2 text-lg outline-none
              text-red-400"
            />
          </div>
          <div className="flex">

            <button onClick={resetInput} className="flex-grow text-gray-500">Cancel</button>

            <button onClick={search} className="flex-grow text-red-400">Search</button>
            
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
