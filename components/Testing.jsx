import React, { useState } from "react";
import cities from "@/cities";
import Image from "next/image";
import { ReactSortable } from "react-sortablejs";

export default function Test() {
  const [cityData, setCityData] = useState(cities);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [loadingImages, setLoadingImages] = useState(true); // State to track image loading

  const onSort = (newCities) => {
    setCityData(newCities);
  };

  // Filter the cities based on the search term
  const filteredCities = cityData.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      {/* Search input */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-2 py-4 bg-gray-300">
        <div className="">
          <h1 className="font-extrabold cursor-pointer text-blue-800 text-sm md:text-lg">
            TOPG GALLERY
          </h1>
        </div>
        <form className="flex w-3/4 md:w-[50%] mx-auto justify-between items-center px-5 py-2 border border-black rounded-md">
          <input
            type="text"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={handleSearch}
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* Display "not found" message when filteredCities is empty */}
      {filteredCities.length === 0 && (
        <div className="flex items-center justify-center h-screen text-red-700">
          No results found.
        </div>
      )}

      <h1 className="text-lg md:text-2xl font-semibold flex items-center justify-center underline text-rose-600 pb-6 md:pb-12 uppercase pt-4">Top cities around the world</h1>

      {/* Sorted and filtered list */}
      <ReactSortable
        list={filteredCities}
        setList={onSort}
        className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6 max-w-6xl mx-auto py-4 px-12 md:px-8 lg:px-4"
        animation={150}
      >
        {filteredCities.map((city) => (
          <div key={city.id}>
            <div className="w-full relative">
              <Image
                width={1000}
                height={500}
                src={city.image}
                alt={city.name}
                placeholder="blur"
                blurDataURL="/spinner.svg" // Replace with your loading spinner image
                style={{
                  width: "w-full",
                  height: "h-auto",
                  cursor: "pointer",
                }}
                className="rounded-lg"
                onLoadingComplete={() => setLoadingImages(false)} // Image loaded callback
              />
              {loadingImages && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                  {/* Loading spinner */}
                  <div className="spinner">
                    <img src="/spinner.svg" alt="spinner" />
                  </div>
                </div>
              )}
              <h2 className="absolute top-2 right-4 text-black backdrop-blur-md bg-white/30 px-2 py-2 rounded-lg font-bold">
                {city.name} <span>{city.country}</span>
              </h2>
            </div>
          </div>
        ))}
      </ReactSortable>
    </div>
  );
}