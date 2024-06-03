"use client";
import React, { useState } from "react";
import { fetchMovie } from "@/api/api";
import MovieCard from "@/components/movie/movie";
import Skeleton from "react-loading-skeleton";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

const Movie = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const movieData = await fetchMovie(searchTerm);
      console.log(movieData);
      if (movieData.Response === "True") {
        setMovies(movieData.Search);
        setLoading(false);
      } else {
        setMovies([]);
        console.error("No movies found");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white w-full h-[120vh]">
      <div className="container mx-auto flex bg-white p-5">
        <div className="w-full rounded-lg bg-gray-200 p-5">
          <div className="flex">
            <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="pointer-events-none absolute w-5 fill-gray-500 transition"
              >
                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
              </svg>
            </div>
            <input
              type="text"
              className="w-full bg-white pl-2 text-base font-semibold outline-0"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <input
              type="button"
              value="Search"
              onClick={handleSearch}
              className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-4 ">
        <h2 className="text-2xl font-bold mb-6">Movie List</h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index}>
                <Skeleton width={200} height={300} />
              </div>
            ))}
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                poster={movie.Poster}
                year={movie.Year}
                title={movie.Title}
              />
            ))}
          </div>
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Movie;
