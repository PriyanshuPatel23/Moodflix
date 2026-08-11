export type moodchipType = {
  emoji?: string;
  id: string;
  isActive?: boolean;
  onClick: (id: string) => void;
  title: string;
  description?: string;
};
