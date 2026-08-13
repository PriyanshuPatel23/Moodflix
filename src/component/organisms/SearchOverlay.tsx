import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearchMoviesQuery } from '@/redux/api/tmdbApi';
import { useDebounce } from '@/hooks/useDebounce';
import { getImageUrl } from '@/utils/getImageUrl';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useSearchMoviesQuery(debouncedQuery, {
    skip: debouncedQuery.trim().length < 2, // don't fire on 1 char or empty
  });

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock background scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset query each time it closes, so it's fresh next time it opens
  // Component unmounts when `isOpen` is false (rendered conditionally by parent),
  // so we don't need to synchronously reset state here.

  if (!isOpen) return null;

  const handleSelectMovie = (movieId: number) => {
    onClose();
    navigate(`/movie/${movieId}`);
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center bg-black/70 backdrop-blur-sm pt-20 md:pt-24 px-4"
      onClick={onClose} // click on backdrop closes
    >
      <div
        className="glass-panel w-full max-w-xl rounded-card p-4 max-h-[70vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // prevent backdrop close when clicking inside panel
      >
        {/* Input row */}
        <div className="flex items-center gap-2 bg-surface-container/60 border border-outline-glass rounded-full px-4 py-3">
          <Search size={18} className="text-text-primary/50" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, moods..."
            className="bg-transparent outline-none text-body-md text-text-primary placeholder:text-text-primary/40 w-full"
          />
          <button onClick={onClose} aria-label="Close search">
            <X size={18} className="text-text-primary/50 hover:text-text-primary" />
          </button>
        </div>

        {/* Results */}
        <div className="mt-4 overflow-y-auto flex-1">
          {debouncedQuery.trim().length < 2 && (
            <p className="text-body-sm text-text-primary/40 text-center py-8">
              Type at least 2 characters to search
            </p>
          )}

          {(isLoading || isFetching) && debouncedQuery.trim().length >= 2 && (
            <p className="text-body-sm text-text-primary/50 text-center py-8">Searching...</p>
          )}

          {data && data.results.length === 0 && !isFetching && (
            <p className="text-body-sm text-text-primary/50 text-center py-8">
              No results for &quot;{debouncedQuery}&quot;
            </p>
          )}

          <div className="flex flex-col gap-2">
            {data?.results.slice(0, 8).map((movie) => (
              <button
                key={movie.id}
                onClick={() => handleSelectMovie(movie.id)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-bright/40 transition-colors text-left"
              >
                <img
                  src={getImageUrl(movie.poster_path, 'w92') ?? '/placeholder-poster.jpg'}
                  alt={movie.title}
                  className="w-10 h-14 object-cover rounded-md shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-body-md text-text-primary font-medium truncate">
                    {movie.title}
                  </p>
                  <p className="text-body-xs text-text-primary/50">
                    {movie.release_date?.slice(0, 4) ?? 'N/A'}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
