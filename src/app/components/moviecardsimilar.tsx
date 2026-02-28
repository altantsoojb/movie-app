import { Movie } from "@/lib/types";
import { Star } from "lucide-react";

export default function MovieCardSimilar(props: Movie) {
  const { poster_path, vote_average, title, overview } = props;
  const shortTitle = title.length > 15 ? title.slice(0, 15) + "..." : title;

  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className="w-33 h-73 sm:w-45 md:w-52 md:h-100">
      <div className="h-full w-full">
        <img
          className="rounded-t-lg w-[132.5px] h-[210px] md:w-[202px] md:h-[310px] overflow-hidden"
          src={imageUrl}
          alt="movie poster"
        />
        <div className="bg-[#F4F4F5] rounded-b-lg w-[132.5px] h-[60px] md:w-[202px] md:h-[80px] relative p-2 dark:bg-gray-600">
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
          <p className="absolute top-8 text-sm md:text-xl w-full md:w-[210px] overflow-hidden text-ellipsis line-clamp-1">
            {shortTitle}
          </p>
        </div>
      </div>
    </div>
  );
}
