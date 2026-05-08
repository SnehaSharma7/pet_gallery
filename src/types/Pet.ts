/**
 * Represents a single pet entity returned by the /pets API.
 * Field names should match the actual API response exactly.
 * Using mock data until real endpoint is confirmed.
 */
export interface Pet {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  /** ISO 8601 date string e.g. "2024-03-15T10:30:00Z" */
  createdAt: string;
  /** Approximate file size in bytes — used for selection size estimate */
  fileSize: number;
}

export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'date-newest'
  | 'date-oldest';
