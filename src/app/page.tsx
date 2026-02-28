import {
  getUpcomingMovies,
  getPopularMovies,
  getTopratedMovies,
  getNowPlaying,
} from "@/lib/api";
import { Hero } from "./components/hero";
import Upcoming from "./components/upcoming";
import Popular from "./components/popular";
import Toprated from "./components/toprated";

export default async function Home() {
  const { results: upcoming } = await getUpcomingMovies();
  const { results: popular } = await getPopularMovies();
  const { results: toprated } = await getTopratedMovies();
  const { results: nowplaying } = await getNowPlaying();

  return (
    <div className="">
      <Hero nowplaying={nowplaying} />
      <Upcoming movies={upcoming} />
      <Popular movies={popular} />
      <Toprated movies={toprated} />
    </div>
  );
}
