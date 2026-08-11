const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export type PosterSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
export type BackdropSize = 'w300' | 'w780' | 'w1280' | 'original';

export function getImageUrl(
  path: string | null | undefined,
  size: PosterSize | BackdropSize = 'w500',
): string | null {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}
