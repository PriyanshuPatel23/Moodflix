import { Search } from 'lucide-react';

interface SearchBarProps {
  onOpen: () => void;
}

const SearchBar = ({ onOpen }: SearchBarProps) => {
  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-2 bg-surface-container/60 border border-outline-glass rounded-full px-4 py-2 w-64 text-left"
    >
      <Search size={16} className="text-text-primary/50" />
      <span className="text-body-sm text-text-primary/40">Search titles, moods...</span>
    </button>
  );
};

export default SearchBar;
