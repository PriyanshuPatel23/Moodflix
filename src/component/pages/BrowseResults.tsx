import { useParams } from 'react-router-dom';
import MovieCard from '../atoms/MovieCard';
import { MOODS } from '@/constants/mood';
import { useGetGenresQuery, useGetMovieByGenreQuery } from '@/redux/api/tmdbApi';
import { getImageUrl } from '@/utils/getImageUrl';

const BrowseResults = () => {
  const { moodSlug } = useParams<{ moodSlug: string }>();
  const selectedMood = MOODS.find((m) => m.mood === moodSlug);
  const { data, isLoading, isError, error } = useGetMovieByGenreQuery(
    { genreId: selectedMood?.genreIds ?? [] },
    { skip: !selectedMood },
  );

  const { data: genresData } = useGetGenresQuery();

  const genreMap: Record<number, string> = {};
  genresData?.genres.forEach((g) => {
    genreMap[g.id] = g.name;
  });

  if (!selectedMood) {
    return <p className="text-text-primary p-8">Unknown mood — go back and pick one.</p>;
  }

  if (isLoading) {
    return <p className="text-text-primary p-8">Loading movies...</p>;
  }

  const errorStatus = error && 'status' in error ? ` (${error.status})` : '';

  if (isError) {
    return <p className="text-text-primary p-8">Something went wrong {errorStatus}.</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-heading-xl text-text-primary mb-6">
        {selectedMood?.emoji} You&apos;re on {selectedMood?.title} mode right now
      </h1>
      <div className="flex flex-wrap justify-center items-center p-4 gap-6">
        {data?.results.map((movie) => (
          <MovieCard
            key={movie.id}
            imageUrl={getImageUrl(movie.poster_path, 'w342') ?? '/placeholder-poster.jpg'}
            title={movie.title}
            genre={genreMap[movie.genre_ids[0]] ?? 'Unknown'}
            launchYear={movie.release_date?.slice(0, 4) ?? 'N/A'}
            rating={movie.vote_average.toFixed(1)}
          />
        ))}
      </div>
    </div>
  );
};

export default BrowseResults;
