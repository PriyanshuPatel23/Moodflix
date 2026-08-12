import type { moodchipType } from '@/types/types';

const MoodChip = ({ emoji, id, isActive, onClick, title, description }: moodchipType) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={`glass-card flex flex-col justify-between p-6 rounded-2xl cursor-pointer w-full max-w-70 h-48 select-none transition-all duration-300 ${
        isActive
          ? 'border-primary bg-surface-bright/40 shadow-[0_0_24px_rgba(255,107,74,0.15)] scale-[1.02]'
          : 'border-white/5 hover:border-primary/30'
      }`}
    >
      <div className="text-4xl flex items-center justify-start">{emoji}</div>
      <div className="flex flex-col gap-1 text-left">
        <p className="text-heading-md font-bold text-text-primary tracking-tight">{title}</p>
        <p className="text-body-sm text-text-primary/60 line-clamp-2 leading-snug">{description}</p>
      </div>
    </div>
  );
};

export default MoodChip;
