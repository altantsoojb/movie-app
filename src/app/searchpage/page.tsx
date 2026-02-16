import React from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import MovieCard from "../components/moviecard";
import { ChevronRight } from "lucide-react";
import { getGenreMovies, searchMovies } from "@/lib/api";
import type { MoviesResponse } from "@/lib/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type SearchPageProps = {
  searchParams: {
    value?: string;
    page?: string;
    name?: string;
    id?: string;
  };
};

const page = async ({ searchParams }: SearchPageProps) => {
  const params = searchParams || {};
  const value = params.value || "";

  const pageIndex = params.page || "1";

  const genres = await getGenreMovies();

  const searchedMovies: MoviesResponse = await searchMovies(
    value,
    Number(pageIndex),
  );

  return (
    <div className="max-w-[1280px] min-h-[894px] flex flex-col gap-8 ">
      <h1 className="max-w-[1280px] h-9 text-text-text-foreground text-3xl font-semibold">
        Search Results
      </h1>
      <div className="max-w-[1280px] min-h-[826px] md:flex ">
        {/* Movie cards section */}
        <div className="max-w-[804px] h-full flex flex-col sm:grid-cols-3 gap-6">
          <p className="col-span-full text-lg font-medium mb-2">
            {searchedMovies.total_results} results for {value}
          </p>
          <div className="flex flex-wrap gap-8">
            {searchedMovies.results.map((movie) => (
              <div
                key={movie.id}
                className="w-[157.5px] sm:w-[165px] h-[309.1px] sm:h-[331px] gap-5"
              >
                <MovieCard {...movie} />
              </div>
            ))}
          </div>

          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    {searchedMovies.page}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
        {/* Column separator */}
        <div className="hidden sm:flex items-center space-x-4">
          <Separator orientation="vertical" className="h-20" />
        </div>
        {/* Search by genre */}
        <div className="max-w-[387px] min-h-[352px] ml-7">
          <div className="max-w-[213px] min-h-[60px] mb-5">
            <h1 className="text-text-text-foreground text-2xl font-semibold leading-loose">
              Search by genre
            </h1>
            <p className="text-text-text-foreground text-base font-normal leading-normal">
              See lists of movies by genre
            </p>
          </div>

          <div className="max-w-[387px]  flex flex-wrap gap-4 hover:!bg-transparent p-0">
            {genres.map((genre: { id: number; name: string }) => (
              <div key={genre.id}>
                <a className="inline-flex items-center h-5 px-3 py-1 text-sm font-medium rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                  {genre.name}
                  <ChevronRight size={12} className="ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
