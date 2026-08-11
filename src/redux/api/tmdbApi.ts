import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genre[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: Genre[];
  credits: {
    cast: Cast[];
  };
  similar: MoviesResponse;
}

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${API_KEY}`);
      return headers;
    },
  }),
  tagTypes: ['Movies', 'MovieDetails', 'Trending', 'Genres', 'Recommendations', 'Search'],
  endpoints: (builder) => ({
    getMovieByGenre: builder.query<MoviesResponse, { genreId: number[]; page?: number }>({
      query: ({ genreId, page = 1 }) =>
        `/discover/movie?with_genres=${genreId.join(',')}&page=${page}&sort_by=popularity.desc`,
      providesTags: ['Movies'],
    }),
    searchMovies: builder.query<MoviesResponse, string>({
      query: (searchTerm) => `/search/movie?query=${encodeURIComponent(searchTerm)}`,
      providesTags: ['Search'],
    }),
    getMovieDetails: builder.query<MovieDetails, number | string>({
      query: (movieId) => `/movie/${movieId}?append_to_response=credits,similar`,
      providesTags: (_result, _error, id) => [{ type: 'MovieDetails', id }],
    }),
    getGenres: builder.query<GenresResponse, void>({
      query: () => '/genre/movie/list',
      providesTags: ['Genres'],
    }),
  }),
});

export const {
  useGetMovieByGenreQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetGenresQuery,
} = tmdbApi;
