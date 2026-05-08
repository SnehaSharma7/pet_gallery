import type { Pet } from '../types/Pet';
import { MOCK_PETS } from './mockData';

/** Base URL for the real API — change this when backend is ready */
const API_BASE = '/pets';

/**
 * Fetches all pets from the API.
 * Falls back to mock data in development when the endpoint is unreachable.
 */
export async function fetchPets(): Promise<Pet[]> {
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: Pet[] = await res.json();
    return data;
  } catch {
    // Use mock data when API is unavailable (e.g. during local development)
    console.warn('[api] /pets unavailable — using mock data');
    return Promise.resolve(MOCK_PETS);
  }
}

/**
 * Fetches a single pet by id.
 */
export async function fetchPetById(id: string): Promise<Pet | undefined> {
  try {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return MOCK_PETS.find((p) => p.id === id);
  }
}
