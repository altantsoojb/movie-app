import MovieCard from "../components/moviecard";
import { getUpcomingMovies } from "@/lib/api";
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
import { PaginationComponent } from "../components/pagination";

export default async function Upcomingpage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;

  const { results, total_pages } = await getUpcomingMovies(currentPage);

  const totalPages = total_pages;

  return (
    <div className="p-10">
      <h3 className="font-semibold text-2xl pb-4">Upcoming</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {results.map((movie: any) => (
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
}
