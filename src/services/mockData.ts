import type { Pet } from '../types/Pet';

/**
 * Mock pets data used while the real /pets endpoint is unavailable.
 * Replace with real API data once confirmed — only the API service needs updating.
 */
export const MOCK_PETS: Pet[] = Array.from({ length: 40 }, (_, i) => {
  const animals = [
    { name: 'Golden Retriever', tag: 'dog' },
    { name: 'Persian Cat', tag: 'cat' },
    { name: 'Siberian Husky', tag: 'dog' },
    { name: 'Bengal Tiger', tag: 'tiger' },
    { name: 'French Bulldog', tag: 'dog' },
    { name: 'Maine Coon', tag: 'cat' },
    { name: 'Labrador', tag: 'dog' },
    { name: 'Ragdoll Cat', tag: 'cat' },
    { name: 'German Shepherd', tag: 'dog' },
    { name: 'Scottish Fold', tag: 'cat' },
  ];
  const descs = [
    'A friendly and loyal companion.',
    'Elegant and calm in nature.',
    'Energetic and loves the outdoors.',
    'Majestic and powerful.',
    'Playful and great with kids.',
    'Gentle giant with silky fur.',
    'Devoted family dog.',
    'Soft-voiced and affectionate.',
    'Intelligent and protective.',
    'Quirky ears and sweet temper.',
  ];
  const idx = i % 10;
  const animal = animals[idx];
  const date = new Date(2023, idx % 12, (idx * 3 + i) % 28 + 1);
  return {
    id: String(i + 1),
    title: `${animal.name} #${i + 1}`,
    description: descs[idx],
    // Lock each record to a deterministic animal-themed image.
    imageUrl: `https://loremflickr.com/800/600/${animal.tag}?lock=${i + 1}`,
    createdAt: date.toISOString(),
    fileSize: 80000 + (i * 13337) % 120000,
  };
});
