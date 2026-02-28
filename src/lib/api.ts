import { ActorsDetails, Genre, MovieDetails, MoviesResponse } from "./types";

const token = process.env.API_TOKEN;

const upcomingUrl = "/movie/upcoming?language=en-US";
const popularUrl = "/movie/popular?language=en-US";
const topratedUrl = "/movie/top_rated?language=en-US";
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
export const getUpcomingMovies = async (page = 1): Promise<MoviesResponse> => {
  const response = await fetch(`${url}${upcomingUrl}&page=${page}`, options);
  return response.json();
};
export const getPopularMovies = async (page = 1): Promise<MoviesResponse> => {
  const response = await fetch(`${url}${popularUrl}&page=${page}`, options);
  return response.json();
};
export const getTopratedMovies = async (page = 1): Promise<MoviesResponse> => {
  const response = await fetch(`${url}${topratedUrl}&page=${page}`, options);
  return response.json();
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
  return similarData;
};
export const getMovieDetail = async (
  movieId: string,
): Promise<MovieDetails> => {
  const response = await fetch(
    `${url}${`/movie/${movieId}?language=en-US`}`,
    options,
  );
  const data = await response.json();

  return data;
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
    options,
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
export const discoverMovies = async (
  genreId: string,
  page: number,
): Promise<MoviesResponse> => {
  const discoverUrl = `/discover/movie?language=en-US&with_genres=${genreId}&page=${page}`;

  const response = await fetch(`${url}${discoverUrl}`, options);
  const data = await response.json();

  return data;
};
