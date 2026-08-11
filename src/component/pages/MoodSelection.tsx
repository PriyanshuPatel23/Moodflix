import { useState } from 'react';
import MoodChip from '@/component/atoms/MoodChip';
import { MOODS } from '@/constants/mood';
import { useNavigate } from 'react-router-dom';

const MoodSelection = () => {
  const [activeId, setActiveId] = useState<string>('1');
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    setActiveId(id); // keeps the visual highlight if user lingers before navigating
    const selectedMood = MOODS.find((m) => m.id === id);
    if (selectedMood) {
      navigate(`/browse/${selectedMood.mood}`); // e.g. /browse/chill
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-8 bg-linear-to-b from-bg-dark to-bg-gradient-end">
      <div className="text-center mb-10 max-w-2xl">
        <p className="text-display-lg text-text-primary/70 tracking-wide font-semibold">
          What&apos;s your vibe Today?
        </p>
        <p className="text-body-md text-text-primary/70 tracking-wide font-medium">
          Select a mood and let us curate the perfect cinematic experience.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl">
        {MOODS.map((m) => (
          <MoodChip
            key={m.id}
            id={m.id}
            title={m.title}
            description={m.description}
            emoji={m.emoji}
            isActive={activeId === m.id}
            onClick={handleSelect}
          />
        ))}
      </div>
      {/* Soft top radial light glow (centered behind header, not touching the top) */}
      <div className="absolute -top-50 left-1/2 -translate-x-1/2 w-150 h-187.5 rounded-full bg-white/8 blur-[100px] pointer-events-none z-0"></div>
    </div>
  );
};

export default MoodSelection;
