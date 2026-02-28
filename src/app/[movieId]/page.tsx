import {
  getMovieActorsDetail,
  getMovieDetail,
  getSimilarMovies,
} from "@/lib/api";
import { Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import MovieCard from "../components/moviecard";
import { Movie } from "@/lib/types";
import MovieCardSimilar from "../components/moviecardsimilar";

type DetailsPageProps = {
  params: Promise<{ movieId: string }>;
};
const DetailsPage = async ({ params }: DetailsPageProps) => {
  const { movieId } = await params;
  const movie = await getMovieDetail(movieId);
  const movieActors = await getMovieActorsDetail(movieId);
  console.log(movieActors);
  const movieSimilar = await getSimilarMovies(movieId);
  console.log(movieActors);
  const writer = movieActors.crew
    .filter((person) => person.job === "Writer")
    .map((person) => person.name);

  const filteredMovies = movieSimilar.results.filter(
    (movie) => movie.poster_path,
  );

  const baseImgUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div>
      <div className="max-w-270 mx-auto">
        {/* head section */}
        <div className="flex justify-between pb-6">
          <div>
            <h1 className="font-bold text-[36px]">{movie.title}</h1>
            <p className="text-lg text-[16px] font-normal">
              {movie.release_date}
              <span> · </span>
              <span className={`badge ${movie.adult ? "true" : "false"}`}>
                {movie.adult ? "18+" : "Family"}
                <span> · </span>
                <span>
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              </span>
            </p>
          </div>
          <div className="pt-2">
            <p className="text-[12px] font-medium">Rating</p>
            <div className="">
              <p className="font-semibold text-[18px] flex">
                <span>
                  <Star color="#FDE047" fill="#FDE047" className="" />
                </span>
                {movie.vote_average.toFixed(1)}
                <span className="font-medium text-[14px] text-[#71717A] pt-1">
                  /10
                </span>
              </p>
              <p>{movie.vote_count}</p>
            </div>
          </div>
        </div>
        {/* pics */}
        <div className="flex justify-between">
          <img
            src={`${baseImgUrl}${movie.poster_path}`}
            alt={movie.title}
            className="max-w-72.25"
          />
          <img
            src={`${baseImgUrl}${movie.backdrop_path}`}
            alt={movie.title}
            className="max-w-190"
          />
        </div>
        {/* genres */}
        <div className="flex gap-2 pt-4">
          {movie.genres.map((genre) => (
            <span
              key={genre.id}
              className="whitespace-nowrap gap-2 flex items-center w-fit px-3 py-1 h-5 text-xs font-semibold rounded-full border border-gray-300 dark:text-white text-gray-700 dark:hover:bg-gray-700 hover:border-gray-400 transition"
            >
              {genre.name}
            </span>
          ))}
        </div>
        {/* overview */}
        <div className="pt-3">
          <p>{movie.overview}</p>
        </div>
        {/* detail info */}
        <div className="flex gap-14 pt-5 pb-3">
          <h1 className="font-bold">Director</h1>
          <p>
            {movieActors.crew
              .filter((person) => person.job === "Director")
              .map((person) => person.name)
              .join(" • ")}
          </p>
        </div>
        <Separator />
        <div className="flex gap-16 pt-5 pb-3">
          <h1 className="font-bold">Writers</h1>
          <p>
            {movieActors.crew
              .filter(
                (person) =>
                  person.job === "Writer" || person.job === "Screenplay",
              )
              .map((person) => person.name)
              .join(" • ")}
          </p>
        </div>
        <Separator />
        <div className="flex gap-19.5 pt-5 pb-3">
          <h1 className="font-bold">Stars</h1>
          <div className="flex gap-2">
            {movieActors.cast.slice(0, 3).map((actor) => (
              <p key={actor.id}>{actor.name} • </p>
            ))}
          </div>
        </div>
        <Separator />
      </div>
      <div className="md:max-w-[1080px] mx-auto md:max-h-[960px] ">
        <div className="">
          <div className="flex max-w-340 justify-between">
            <h3 className="font-semibold text-2xl py-3">More like this</h3>
            <Link href="./popularpage" className="pt-4">
              see more →
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center">
          {filteredMovies.slice(0, 10).map((movie) => (
            <Link href={`/${movie.id}`} key={movie.id}>
              <MovieCardSimilar {...movie} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DetailsPage;
