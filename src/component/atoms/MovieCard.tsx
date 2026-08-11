interface MovieCardProps {
  imageUrl: string;
  title: string;
  genre: string;
  launchYear: string;
  rating: string;
}

const MovieCard = ({ imageUrl, title, genre, launchYear, rating }: MovieCardProps) => {
  return (
    <div className="relative bg-surface-container w-50 h-70 rounded-card overflow-hidden flex flex-col justify-end gap-2 px-3 py-4">
      {/* Poster image */}
      <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

      {/* Badge row */}
      <div className="relative flex items-center gap-2 z-10">
        <span className="bg-primary/15 text-primary text-body-xs font-semibold px-3 py-1 rounded-full border border-primary/20">
          {genre}
        </span>
        <span className="text-text-primary/80 text-body-sm font-medium">{launchYear}</span>
      </div>

      {/* Title */}
      <p className="relative text-heading-md font-bold text-text-primary z-10 line-clamp-1">
        {title}
      </p>

      {/* Rating */}
      <div className="relative flex items-center gap-1 z-10">
        <span className="text-mood-chill text-body-sm">★</span>
        <span className="text-body-sm text-mood-chill">{rating}/10</span>
      </div>
    </div>
  );
};

export default MovieCard;
