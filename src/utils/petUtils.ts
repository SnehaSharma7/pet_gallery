import type { Pet, SortOption } from '../types/Pet';

/**
 * Filters pets by search query against title and description (case-insensitive).
 */
export function filterPets(pets: Pet[], query: string): Pet[] {
  const q = query.toLowerCase().trim();
  if (!q) return pets;
  return pets.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}

/**
 * Sorts an array of pets by the given sort option.
 * Returns a new array — does not mutate the original.
 */
export function sortPets(pets: Pet[], sort: SortOption): Pet[] {
  const copy = [...pets];
  switch (sort) {
    case 'name-asc':
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return copy.sort((a, b) => b.title.localeCompare(a.title));
    case 'date-newest':
      return copy.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'date-oldest':
      return copy.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    default:
      return copy;
  }
}

/**
 * Formats bytes into a human-readable string (KB / MB).
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Paginates an array. Returns the slice for the given 1-based page.
 */
export function paginateArray<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
