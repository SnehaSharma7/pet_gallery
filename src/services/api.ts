import type { Pet } from '../types/Pet';
import { MOCK_PETS } from './mockData';

const CAT_BREEDS_API = 'https://api.thecatapi.com/v1/breeds';
const CAT_IMAGE_API = 'https://api.thecatapi.com/v1/images';
const DOG_IMAGE_API = 'https://dog.ceo/api/breed';
const WIKI_SUMMARY_API = 'https://en.wikipedia.org/api/rest_v1/page/summary';

interface CatBreed {
  id: string;
  name: string;
  description: string;
  temperament?: string;
  origin?: string;
  life_span?: string;
  reference_image_id?: string;
}

interface CatImage {
  url: string;
  width?: number;
  height?: number;
}

interface DogImageResponse {
  message: string;
  status: string;
}

interface WikiSummaryResponse {
  title?: string;
  extract?: string;
  thumbnail?: {
    source?: string;
  };
}

interface DogBreedSeed {
  slug: string;
  title: string;
  wikiTitle: string;
}

const DOG_BREEDS: DogBreedSeed[] = [
  { slug: 'retriever/golden', title: 'Golden Retriever', wikiTitle: 'Golden_Retriever' },
  { slug: 'retriever/labrador', title: 'Labrador Retriever', wikiTitle: 'Labrador_Retriever' },
  { slug: 'germanshepherd', title: 'German Shepherd', wikiTitle: 'German_Shepherd' },
  { slug: 'husky', title: 'Siberian Husky', wikiTitle: 'Siberian_Husky' },
  { slug: 'bulldog/french', title: 'French Bulldog', wikiTitle: 'French_Bulldog' },
  { slug: 'beagle', title: 'Beagle', wikiTitle: 'Beagle' },
  { slug: 'poodle/miniature', title: 'Miniature Poodle', wikiTitle: 'Poodle' },
  { slug: 'boxer', title: 'Boxer', wikiTitle: 'Boxer_(dog)' },
  { slug: 'dachshund', title: 'Dachshund', wikiTitle: 'Dachshund' },
  { slug: 'pomeranian', title: 'Pomeranian', wikiTitle: 'Pomeranian_dog' },
  { slug: 'corgi/cardigan', title: 'Cardigan Welsh Corgi', wikiTitle: 'Cardigan_Welsh_Corgi' },
  { slug: 'shihtzu', title: 'Shih Tzu', wikiTitle: 'Shih_Tzu' },
  { slug: 'chihuahua', title: 'Chihuahua', wikiTitle: 'Chihuahua_(dog)' },
  { slug: 'collie/border', title: 'Border Collie', wikiTitle: 'Border_Collie' },
  { slug: 'mastiff/bull', title: 'Bullmastiff', wikiTitle: 'Bullmastiff' },
  { slug: 'terrier/yorkshire', title: 'Yorkshire Terrier', wikiTitle: 'Yorkshire_Terrier' },
  { slug: 'dalmatian', title: 'Dalmatian', wikiTitle: 'Dalmatian_(dog)' },
  { slug: 'doberman', title: 'Dobermann', wikiTitle: 'Dobermann' },
  { slug: 'samoyed', title: 'Samoyed', wikiTitle: 'Samoyed_(dog)' },
  { slug: 'vizsla', title: 'Vizsla', wikiTitle: 'Vizsla' },
];

let petsCache: Pet[] | null = null;
let petsInFlight: Promise<Pet[]> | null = null;
const wikiSummaryCache = new Map<string, Promise<WikiSummaryResponse>>();

function toIsoDate(index: number): string {
  const now = Date.now();
  return new Date(now - index * 86_400_000).toISOString();
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

function computeEstimatedSize(width?: number, height?: number, seed = 0): number {
  if (width && height) return Math.max(90_000, Math.floor(width * height * 0.12));
  return 110_000 + (seed * 9_973) % 140_000;
}

async function getWikiSummary(wikiTitle: string): Promise<WikiSummaryResponse> {
  const key = wikiTitle;
  const cached = wikiSummaryCache.get(key);
  if (cached) return cached;

  const request = getJson<WikiSummaryResponse>(`${WIKI_SUMMARY_API}/${encodeURIComponent(wikiTitle)}`)
    .catch(() => ({}));

  wikiSummaryCache.set(key, request);
  return request;
}

async function getCatImageUrl(referenceImageId?: string): Promise<CatImage | null> {
  if (!referenceImageId) return null;
  try {
    const image = await getJson<CatImage>(`${CAT_IMAGE_API}/${referenceImageId}`);
    if (image.url) return image;
  } catch {
    // Skip this breed when image can't be verified.
  }
  return null;
}

function isDogImageRelevant(imageUrl: string, slug: string): boolean {
  const normalized = imageUrl.toLowerCase();
  const segments = slug.split('/').map((s) => s.trim().toLowerCase()).filter(Boolean);
  return segments.every((segment) => normalized.includes(segment));
}

async function fetchCats(limit: number): Promise<Pet[]> {
  const breeds = await getJson<CatBreed[]>(CAT_BREEDS_API);
  const selected = breeds.filter((b) => b.description).slice(0, limit);

  const mapped = await Promise.all(
    selected.map(async (breed, index) => {
      const image = await getCatImageUrl(breed.reference_image_id);
      if (!image) return null;

      const details = [
        breed.description,
        breed.temperament ? `Temperament: ${breed.temperament}.` : null,
        breed.origin ? `Origin: ${breed.origin}.` : null,
        breed.life_span ? `Life span: ${breed.life_span} years.` : null,
      ]
        .filter(Boolean)
        .join(' ');

      return {
        id: `cat-${breed.id}`,
        title: `${breed.name} (Cat)`,
        description: details,
        imageUrl: image.url,
        createdAt: toIsoDate(index),
        fileSize: computeEstimatedSize(image.width, image.height, index),
      } satisfies Pet;
    })
  );

  return mapped.filter((item): item is Pet => item !== null);
}

async function fetchDogDescription(wikiTitle: string): Promise<string> {
  const summary = await getWikiSummary(wikiTitle);
  if (summary.extract) return summary.extract;
  return 'A popular domestic dog breed known for companionship, trainability, and unique personality traits.';
}

async function fetchDogs(limit: number): Promise<Pet[]> {
  const selected = DOG_BREEDS.slice(0, limit);

  const mapped = await Promise.all(
    selected.map(async (breed, index) => {
      let dogImageUrl: string | null = null;
      if (!dogImageUrl) {
        try {
          const image = await getJson<DogImageResponse>(`${DOG_IMAGE_API}/${breed.slug}/images/random`);
          if (image.status === 'success' && isDogImageRelevant(image.message, breed.slug)) {
            dogImageUrl = image.message;
          }
        } catch {
          // Skip this breed when image can't be verified.
        }
      }

      if (!dogImageUrl) return null;

      const summary = await fetchDogDescription(breed.wikiTitle);

      return {
        id: `dog-${breed.slug.replace('/', '-')}`,
        title: `${breed.title} (Dog)`,
        description: summary,
        imageUrl: dogImageUrl,
        createdAt: toIsoDate(index + 20),
        fileSize: computeEstimatedSize(undefined, undefined, index + 100),
      } satisfies Pet;
    })
  );

  return mapped.filter((item): item is Pet => item !== null);
}

async function fetchLivePets(): Promise<Pet[]> {
  const [cats, dogs] = await Promise.all([fetchCats(30), fetchDogs(30)]);
  const strictPets = [...cats, ...dogs];

  if (strictPets.length === 0) throw new Error('No strictly matched pets available from live APIs');
  return strictPets;
}

/**
 * Fetches pets from free public APIs and caches the result in-memory.
 * Falls back to local mock data when external services are unavailable.
 */
export async function fetchPets(): Promise<Pet[]> {
  if (petsCache) return petsCache;
  if (petsInFlight) return petsInFlight;

  petsInFlight = fetchLivePets()
    .then((pets) => {
      petsCache = pets;
      return pets;
    })
    .catch(() => {
      // Fallback keeps the app usable if external APIs are blocked/rate-limited.
      return MOCK_PETS;
    })
    .finally(() => {
      petsInFlight = null;
    });

  return petsInFlight;
}

/**
 * Fetches a single pet by id.
 */
export async function fetchPetById(id: string): Promise<Pet | undefined> {
  const pets = await fetchPets();
  return pets.find((p) => p.id === id);
}
