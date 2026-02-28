import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import MovieCard from "../components/moviecard";
import { ChevronRight } from "lucide-react";
import { getGenreMovies, searchMovies } from "@/lib/api";
import type { MoviesResponse } from "@/lib/types";
import { PaginationComponent } from "../components/pagination";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
};

const page = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams;

  const q = params?.q || "";
  const pageIndex = params?.page || "1";

  const genres = await getGenreMovies();

  const searchedMovies: MoviesResponse = await searchMovies(
    q,
    Number(pageIndex),
  );
  const filteredMovies = searchedMovies.results.filter(
    (movie) => movie.poster_path,
  );
  const currentPage = Number(params?.page) || 1;
  const { results, total_pages } = await searchMovies(String(currentPage));
  const totalPages = Math.min(total_pages, 500);
  console.log("totalPages:", totalPages);

  return (
    <div className="mx-auto flex flex-col gap-8 px-4">
      <h1 className="text-3xl font-semibold text-text-text-foreground">
        Search Results
      </h1>

      <div className="flex flex-col xl:flex-row gap-10">
        {/* LEFT SIDE */}
        <div className="flex-1 flex flex-col gap-6">
          <p className="text-lg font-medium">
            {searchedMovies.total_results} results for {q}
          </p>

          {/* GRID */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 
auto-rows-[350px] md:auto-rows-[420px] 
overflow-y-auto h-[694px]"
          >
            {filteredMovies.map((movie) => (
              <Link href={`/${movie.id}`} key={movie.id}>
                <MovieCard key={movie.id} {...movie} />
              </Link>
            ))}
          </div>
        </div>

        {/* SEPARATOR */}
        <div className="hidden md:flex">
          <Separator orientation="vertical" className="h-auto" />
        </div>

        {/* RIGHT SIDE */}
        <div className="md:max-w-[387px]">
          <div className="mb-5">
            <h1 className="text-2xl font-semibold text-text-text-foreground">
              Search by genre
            </h1>
            <p className="text-base text-text-text-foreground">
              See lists of movies by genre
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {genres.map((genre: { id: number; name: string }) => (
              <div key={genre.id}>
                <a className="inline-flex items-center h-8 px-3 text-sm font-medium rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                  {genre.name}
                  <ChevronRight size={12} className="ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};
export default page;
