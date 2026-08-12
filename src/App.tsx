import { Route, Routes } from 'react-router-dom';
import './App.css';
import MoodSelection from './component/pages/MoodSelection';
import BrowseResults from './component/pages/BrowseResults';
import Navbar from './component/organisms/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MoodSelection />} />
        <Route path="/browse/:moodSlug" element={<BrowseResults />} />
      </Routes>
    </>
  );
}

export default App;
