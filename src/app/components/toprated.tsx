import Link from "next/link";
import MovieCard from "./moviecard";
import { ArrowRight } from "lucide-react";
import { Movie } from "@/lib/types";

type PopularProps = {
  movies: Movie[];
};

export default function Toprated({ movies }: PopularProps) {
  return (
    <div className="  ">
      <div className="pl-9">
        <div className="flex max-w-340 justify-between">
          <h3 className="font-semibold text-2xl py-3">Top Rated</h3>
          <Link href="./topratedpage" className="pt-4">
            see more →
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center">
        {movies.slice(0, 10).map((movie) => (
          <Link href={`/${movie.id}`} key={movie.id}>
            <MovieCard {...movie} />
          </Link>
        ))}
      </div>
    </div>
  );
}
