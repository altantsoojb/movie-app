"use client";
import { Genre } from "@/lib/types";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { getGenreMovies } from "@/lib/api";

type DropdownProps = {
  genres: Genre[];
};
export function GenreButton({ genres }: DropdownProps) {
  const [getGenres, setgetGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const res = async () => {
      const data = await getGenreMovies();
      setgetGenres(data);
    };
    res();
  }, []);
  return (
    <div className="flex flex-wrap gap-2 h-40 w-135">
      {getGenres?.map((genre) => (
        <button
          key={genre.id}
          className="flex items-center gap-1 px-3 py-1 h-5 text-xs font-medium rounded-full border border-gray-300 hover:bg-gray-100 transition-colors dark:hover:bg-gray-700"
        >
          {genre.name}
          <ChevronRight size={12} className="text-gray-400" />
        </button>
      ))}
    </div>
  );
}
