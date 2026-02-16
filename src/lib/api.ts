import {
  ActorsDetails,
  Genre,
  MovieAndCrewDetails,
  MovieDetails,
  MoviesResponse,
} from "./types";

const token = process.env.API_TOKEN;

const upcomingUrl = "/movie/upcoming?language=en-US&page=1";
const popularUrl = "/movie/popular?language=en-US&page=1";
const topratedUrl = "/movie/top_rated?language=en-US&page=1";
const nowplayingUrl = "/movie/now_playing?language=en-US&page=1";
const genreUrl = "/genre/movie/list?language=en";
const url = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};
export const getUpcomingMovies = async (): Promise<MoviesResponse> => {
  const response = await fetch(`${url}${upcomingUrl}`, options);
  const data = await response.json();
  return data;
};
export const getPopularMovies = async (): Promise<MoviesResponse> => {
  const response = await fetch(`${url}${popularUrl}`, options);
  const data = await response.json();
  return data;
};
export const getTopratedMovies = async (): Promise<MoviesResponse> => {
  const response = await fetch(`${url}${topratedUrl}`, options);
  const data = await response.json();
  return data;
};
export const getNowPlaying = async (): Promise<MoviesResponse> => {
  const response = await fetch(`${url}${nowplayingUrl}`, options);
  const data = await response.json();
  return data;
};
export const getSimilarMovies = async (
  movieId: string,
): Promise<MoviesResponse> => {
  const similarMovie = `/movie/${movieId}/similar?language=en-US&page=1`;
  const response = await fetch(`${url}${similarMovie}`, options);
  const similarData = await response.json();
  return similarData    ;
};
export const getMovieDetail = async (
  movieId: string,
): Promise<MovieAndCrewDetails> => {
  const movieDetail = `/movie/${movieId}?language=en-US`;
  const response = await fetch(`${url}${movieDetail}`, options);
  const data = await response.json();
  const actorsDetails = await getMovieActorsDetail(movieId);
  return { data, actorsDetails };
};

export const getMovieActorsDetail = async (
  movieId: string,
): Promise<ActorsDetails> => {
  const movieActorsDetail = `/movie/${movieId}/credits?language=en-US`;
  const response = await fetch(`${url}${movieActorsDetail}`, options);
  const data = await response.json();
  return data;
};
export const searchMovies = async (
  searchValue: string,
  page = 1,
): Promise<MoviesResponse> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      searchValue,
    )}&language=en-US&page=${page}`,
    options, // your existing token config
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  return response.json();
};
export const getGenreMovies = async (): Promise<Genre[]> => {
  const response = await fetch(`${url}${genreUrl}`, options);
  const data = await response.json();
  return data.genres;
};
