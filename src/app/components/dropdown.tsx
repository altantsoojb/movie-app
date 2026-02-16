"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getGenreMovies } from "@/lib/api";
import { Genre } from "@/lib/types";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type DropdownProps = {
  genres: Genre[];
};

export function DropdownMenuButton({ genres }: DropdownProps) {
  const [getGenres, setgetGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const res = async () => {
      const data = await getGenreMovies();
      setgetGenres(data);
    };
    res();
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ChevronDown className="mr-2 h-4 w-4" /> Genre
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-145 p-4" align="start">
        <div className="space-y-4 ">
          <div>
            <h1 className="text-xl font-bold">Genre</h1>
            <p className="text-sm text-muted-foreground">
              See lists of movies by genre
            </p>
          </div>

          <DropdownMenuSeparator />

          <div>
            <h2 className="text-sm font-semibold mb-3 text-gray-500 uppercase">
              Genres
            </h2>
            <div className="flex flex-wrap gap-2 h-40 w-135">
              {getGenres?.map((genre) => (
                <button
                  key={genre.id}
                  className="flex items-center gap-1 px-3 py-1 h-5 text-xs font-medium rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  {genre.name}
                  <ChevronRight size={12} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
