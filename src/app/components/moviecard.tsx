import { Movie } from "@/lib/types";
import { Star } from "lucide-react";

export default function MovieCard(props: Movie) {
  const { poster_path, vote_average, title, overview } = props;

  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className="w-39.5 h-77.5 sm:w-50 md:w-57.5 md:h-110">
      <img className="rounded-t-lg" src={imageUrl} alt="movie poster" />
      <div className="bg-[#F4F4F5] rounded-b-lg h-21 relative p-2 dark:bg-gray-600">
        <div className="flex relative">
          <span>
            <Star
              size={18}
              fill="#FFDF00"
              color="#FFDF00"
              className="absolute top-0.5"
            />
          </span>
          <span className="absolute left-5">
            <span>{vote_average.toFixed(1)}</span>
            <span className="text-[#71717A]">/10</span>
          </span>
        </div>
        <p className="absolute top-8">{title}</p>
      </div>
    </div>
  );
}
