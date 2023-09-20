import { signIn, useSession } from "next-auth/react";
import React from "react";

export default function Navbar() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-2 py-4 bg-gray-300">
        <div className="">
          <h1 className="font-extrabold cursor-pointer text-blue-800 text-sm md:text-lg">
            TOPG GALLERY
          </h1>
        </div>
        <form className="flex w-3/4 md:w-[50%] mx-auto justify-between items-center px-5 py-2 border border-black rounded-md">
          <input
            type="text"
            placeholder="What do you want to watch?"
            className="w-full h-7 rounded-sm outline-none bg-transparent flex-1 text-black"
          />
          <button type="submit">
            <svg
              className=" cursor-pointer"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-2 py-4 bg-gray-300">
      <div className="">
        <h1 className="font-extrabold cursor-pointer text-blue-800 text-sm md:text-lg">
          TOPG GALLERY
        </h1>
      </div>
      <form className="flex w-3/4 md:w-[50%] mx-auto justify-between items-center px-5 py-2 border border-black rounded-md">
        <input
          type="text"
          placeholder="What do you want to watch?"
          className="w-full h-7 rounded-sm outline-none bg-transparent flex-1 text-black"
        />
        <button type="submit">
          <svg
            className=" cursor-pointer"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
