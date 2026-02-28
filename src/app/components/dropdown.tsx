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
import { GenreButton } from "./genre";

type DropdownProps = {
  genres: Genre[];
};

export function DropdownMenuButton({ genres }: DropdownProps) {

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
            <div className="">
              <GenreButton genres={[]} />
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
