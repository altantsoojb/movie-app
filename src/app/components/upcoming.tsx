import Link from "next/link";
import MovieCard from "./moviecard";

import { Movie } from "@/lib/types";

type UpcomingProps = {
  movies: Movie[];
};

export default function Upcoming({ movies }: UpcomingProps) {
  return (
    <div className="pt-5">
      <div className="pl-8">
        <div className="flex max-w-342 justify-between">
          <h3 className="font-semibold text-2xl py-3">Upcoming</h3>
          <Link href="./upcomingpage" className="pt-4">
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
