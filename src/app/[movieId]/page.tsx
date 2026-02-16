import { getMovieDetail } from "@/lib/api";
import { Star } from "lucide-react";

type DetailsPageProps = {
  params: Promise<{ movieId: string }>;
};
const DetailsPage = async ({ params }: DetailsPageProps) => {
  const { movieId } = await params;
  const movie = await getMovieDetail(movieId);
  console.log({ movie });

  const baseImgUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div>
      <div className="max-w-270 mx-auto">
        {/* head section */}
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-[36px]">{movie.data.title}</h1>
            <p className="text-lg text-[16px] font-normal">
              {movie.data.release_date}
              <span> · </span>
              <span className={`badge ${movie.data.adult ? "true" : "false"}`}>
                {movie.data.adult ? "18+" : "Family"}
                <span> · </span>
                <span>
                  {Math.floor(movie.data.runtime / 60)}h{" "}
                  {movie.data.runtime % 60}m
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
                {movie.data.vote_average}
                <span className="font-medium text-[14px] text-[#71717A] pt-1">
                  /10
                </span>
              </p>
              <p>{movie.data.vote_count}</p>
            </div>
          </div>
        </div>
        {/* pics */}
        <div className="flex justify-between">
          <img
            src={`${baseImgUrl}${movie.data.poster_path}`}
            alt={movie.data.title}
            className="max-w-72.25"
          />
          <img
            src={`${baseImgUrl}${movie.data.backdrop_path}`}
            alt={movie.data.title}
            className="max-w-190"
          />
        </div>
        {/* genres */}
        <div className="flex gap-2 pt-4">
          {movie.data.genres.map((genre) => (
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
          <p>{movie.data.overview}</p>
        </div>
      </div>
    </div>
  );
};
export default DetailsPage;
