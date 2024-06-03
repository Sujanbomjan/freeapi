import React from "react";
import Image from "next/image";

interface MovieProps {
  year: string;
  title: string;
  poster: string;
}

const MovieCard: React.FC<MovieProps> = ({ poster, year, title }) => {
  const placeholderImage = "https://via.placeholder.com/200"; // Placeholder image URL

  return (
    <div className="w-full max-w-xs px-2 mb-5">
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="relative w-full h-72">
          <img
            src={poster ? poster : placeholderImage}
            alt={title}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <ul>
            <li>{year}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
