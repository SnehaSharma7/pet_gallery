import type { Pet, SortOption } from '../types/Pet';

/**
 * Filters an array of pets by a free-text query.
 * The match is case-insensitive and checked against both title and description.
 * An empty / whitespace-only query returns the original array unchanged.
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
 * Sorts an array of pets by the given SortOption.
 * Returns a *new* array — the original is never mutated.
 *
 * Supported options:
 *  - 'name-asc'     → alphabetical A → Z
 *  - 'name-desc'    → alphabetical Z → A
 *  - 'date-newest'  → most recently created first
 *  - 'date-oldest'  → oldest created first
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
 * Formats a byte count into a concise human-readable string.
 * Values under 1 MB are displayed in KB; at or above 1 MB in MB.
 *
 * @example formatFileSize(512000) // "500 KB"
 * @example formatFileSize(2097152) // "2.0 MB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Extracts a single page from a sorted/filtered array.
 * Pages are 1-based: page 1 returns items 0..pageSize-1.
 *
 * @param items    - The full ordered array to paginate.
 * @param page     - 1-based page index.
 * @param pageSize - Number of items per page.
 */
export function paginateArray<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
