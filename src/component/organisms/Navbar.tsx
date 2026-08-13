import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../atoms/SearchBar';
import SearchOverlay from '@/component/organisms/SearchOverlay';
import { Bookmark, Compass, Home, Search } from 'lucide-react';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div>
      <nav className="w-full md:p-7 p-5 hidden md:flex justify-between items-center glass-panel z-50">
        <div>
          <h1 className="text-primary text-display-lg font-semibold">Moodflix</h1>
        </div>
        <div className="flex justify-center items-center gap-5 w-fit">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-body-md font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-text-primary/70 hover:text-text-primary'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `text-body-md font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-text-primary/70 hover:text-text-primary'
              }`
            }
          >
            Watchlist
          </NavLink>
          <NavLink
            to="/browse/all"
            className={({ isActive }) =>
              `text-body-md font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-text-primary/70 hover:text-text-primary'
              }`
            }
          >
            Browse
          </NavLink>
          {/* was: <SearchBar /> — now passes the trigger handler */}
          <SearchBar onOpen={() => setIsSearchOpen(true)} />
        </div>
      </nav>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-panel grid grid-cols-4 items-center py-3 z-50">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-body-xs ${
              isActive ? 'text-primary' : 'text-text-primary/60'
            }`
          }
        >
          <Home size={20} />
          Home
        </NavLink>
        <NavLink
          to="/browse"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-body-xs ${
              isActive ? 'text-primary' : 'text-text-primary/60'
            }`
          }
        >
          <Compass size={20} />
          Browse
        </NavLink>
        <NavLink
          to="/watchlist"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-body-xs ${
              isActive ? 'text-primary' : 'text-text-primary/60'
            }`
          }
        >
          <Bookmark size={20} />
          Watchlist
        </NavLink>
        {/* was: NavLink to="/search" — now a button since there's no /search route,
            it just opens the same overlay as the desktop search bar */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center gap-1 text-body-xs text-text-primary/60"
        >
          <Search size={20} />
          Search
        </button>
      </nav>

      {isSearchOpen && (
        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      )}
    </div>
  );
};

export default Navbar;
