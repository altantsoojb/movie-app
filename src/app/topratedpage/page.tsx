import MovieCard from "../components/moviecard";
import { getGenreMovies, getTopratedMovies, searchMovies } from "@/lib/api";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { MoviesResponse } from "@/lib/types";
import { PaginationComponent } from "../components/pagination";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
};

const Page = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams;

  const q = params?.q || "";
  const currentPage = Number(params?.page) || 1;

  const genres = await getGenreMovies();

  const searchedMovies: MoviesResponse = await searchMovies(q, currentPage);

  const filteredMovies = searchedMovies.results.filter(
    (movie) => movie.poster_path,
  );

  const totalPages = Math.min(searchedMovies.total_pages, 500);

  console.log("totalPages:", totalPages);
  return (
    <div className="p-10">
      <h3 className="font-semibold text-2xl pb-4">Popular</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {filteredMovies.map((movie: any) => (
          <Link href={`/${movie.id}`} key={movie.id}>
            <MovieCard {...movie} />
          </Link>
        ))}
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
export default Page;
