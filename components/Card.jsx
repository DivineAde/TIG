import React from "react";
import Image from "next/image";
import { DragDropContext } from "react-beautiful-dnd";

import sportsCars from "@/carBrands";

export default function Card({ brand }) {
  return (
    <div className="flex flex-col">
      <div className="">
        <Image
          width={500}
          height={500}
          src={brand.imageSrc}
          alt={brand.name}
          style={{
            width: "w-full"
          }}
        />
      </div>
      <h2>{brand.name}</h2>
      <div className="tags">
        {brand.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}
