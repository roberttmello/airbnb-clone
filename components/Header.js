import Image from "next/image";

import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/* Left block - Logo */}
      <div className="relative flex items-center h-10 cursor-pointer my-auto mr-4">
        <Image
          src="/../public/images/logo.png"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Middle block - Search */}
      <div className="flex items-center border-2 rounded-full py-2 md:shadow-sm justify-center">
        <input
          className="flex-grow pl-5 pr-5 bg-transparent outline-none
        text-sm text-gray-600 placeholder-gray-400 overflow-hidden"
          type="text"
          placeholder="Where are you going?"
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
    </header>
  );
};

export default Header;
