import React, { useState } from "react";
import cities from "@/cities";
import Image from "next/image";
import {
  DndContext,
  DragOverlay,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { useSensors, useSensor, MouseSensor, TouchSensor } from "@dnd-kit/core";

export default function Results() {
  const [cityData, setCityData] = useState(cities);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);
  const [loadingImages, setLoadingImages] = useState(true);

  const onSort = (newCities) => {
    setCityData(newCities);
  };

  const filteredCities = cityData.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    setOverId(event.over ? event.over.id : null);
  };

  const handleDragEnd = (event) => {
    if (!overId) return;

    const oldIndex = filteredCities.findIndex((city) => city.id === activeId);
    const newIndex = filteredCities.findIndex((city) => city.id === overId);

    if (oldIndex !== newIndex) {
      const newCityData = arrayMove(filteredCities, oldIndex, newIndex);
      onSort(newCityData);
    }

    setActiveId(null);
    setOverId(null);
  };

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  // Adjust the distance as n;

  return (
    <div>
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
      {/* ... (rest of your code) */}

      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredCities.map((city) => city.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6 max-w-6xl mx-auto py-4 px-12 md:px-8 lg:px-4">
            {filteredCities.map((city) => (
              <CityCard
                key={city.id}
                city={city}
                setLoadingImages={setLoadingImages}
              />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <CityCard
              key={activeId}
              city={filteredCities.find((city) => city.id === activeId)}
              setLoadingImages={setLoadingImages} // Pass the setLoadingImages function
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function CityCard({ city, setLoadingImages, isDragging, loadingImages }) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: city.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className="relative">
        <Image
          width={1500}
          height={1500}
          src={city.image}
          alt={city.name}
          placeholder="blur"
          blurDataURL="/spinner.svg" // Replace with your loading spinner image
          style={{
            width: "w-full",
            cursor: "pointer",
          }}
          className="rounded-lg"
          onLoadingComplete={() => setLoadingImages(false)} // Update loading state
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
  );
}
