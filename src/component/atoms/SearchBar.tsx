import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="flex items-center gap-2 bg-surface-container/60 border border-outline-glass rounded-full px-4 py-2 w-64">
      <Search size={16} className="text-text-primary/50" />
      <input
        type="text"
        placeholder="Search titles, moods..."
        className="bg-transparent outline-none text-body-sm text-text-primary placeholder:text-text-primary/40 w-full"
      />
    </div>
  );
};

export default SearchBar;
