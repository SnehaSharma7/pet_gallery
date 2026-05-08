import { useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { fetchPets } from '../../services/api';
import { useData } from '../../hooks/useData';
import { PetCard } from '../../components/Card/PetCard';
import { Toolbar } from '../../components/Toolbar/Toolbar';
import { SearchSort } from '../../components/SearchSort/SearchSort';
import { Pagination } from '../../components/Pagination/Pagination';
import { filterPets, sortPets, paginateArray } from '../../utils/petUtils';
import type { SortOption } from '../../types/Pet';

const PAGE_SIZE = 12;

export function GalleryPage() {
  const { data: pets, loading, error, isEmpty } = useData(fetchPets);

  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortOption>('date-newest');
  const [page, setPage] = useState(1);

  // Reset to page 1 when search/sort changes
  const handleQuery = (q: string) => { setQuery(q); setPage(1); };
  const handleSort = (s: SortOption) => { setSort(s); setPage(1); };

  const processed = useMemo(() => {
    if (!pets) return [];
    return sortPets(filterPets(pets, query), sort);
  }, [pets, query, sort]);

  const totalPages = Math.ceil(processed.length / PAGE_SIZE);
  const paginated = useMemo(
    () => paginateArray(processed, page, PAGE_SIZE),
    [processed, page]
  );

  if (loading) {
    return (
      <Page>
        <PageHeader>
          <h1>Pet Gallery</h1>
          <ResultCount>Loading real pet profiles…</ResultCount>
        </PageHeader>

        <SkeletonBar />
        <SkeletonToolbar />

        <Grid>
          {Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </Grid>
      </Page>
    );
  }
  if (error) return <StateMsg $error>Failed to load pets: {error}</StateMsg>;
  if (isEmpty) return <StateMsg>No pets found.</StateMsg>;

  return (
    <Page>
      <PageHeader>
        <h1>Pet Gallery</h1>
        <ResultCount>
          {processed.length} result{processed.length !== 1 ? 's' : ''}
        </ResultCount>
      </PageHeader>

      <SearchSort
        query={query}
        sort={sort}
        onQueryChange={handleQuery}
        onSortChange={handleSort}
      />

      <Toolbar visiblePets={processed} allPets={pets ?? []} />

      {paginated.length === 0 ? (
        <StateMsg>No pets match your search.</StateMsg>
      ) : (
        <Grid>
          {paginated.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </Grid>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Page>
  );
}

// ---------------------------------------------------------------------------
// Styled components
// ---------------------------------------------------------------------------

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% { background-position: -260px 0; }
  100% { background-position: calc(260px + 100%) 0; }
`;

const Page = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px 64px;
  animation: ${fadeInUp} 360ms ease-out;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 24px;

  h1 {
    font-size: clamp(30px, 5vw, 40px);
    font-weight: 700;
    line-height: 1;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ResultCount = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
`;

/** Responsive grid: 1 col → 2 col → 4 col */
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  > * {
    animation: ${fadeInUp} 420ms ease-out both;
  }

  > *:nth-child(2) { animation-delay: 35ms; }
  > *:nth-child(3) { animation-delay: 70ms; }
  > *:nth-child(4) { animation-delay: 105ms; }
  > *:nth-child(5) { animation-delay: 140ms; }
  > *:nth-child(6) { animation-delay: 175ms; }
  > *:nth-child(7) { animation-delay: 210ms; }
  > *:nth-child(8) { animation-delay: 245ms; }

  @media (prefers-reduced-motion: reduce) {
    > * {
      animation: none;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StateMsg = styled.div<{ $error?: boolean }>`
  text-align: center;
  padding: 80px 24px;
  font-size: 18px;
  color: ${({ theme, $error }) =>
    $error ? theme.colors.danger : theme.colors.textMuted};
`;

const SkeletonSurface = styled.div`
  background: linear-gradient(
    90deg,
    rgba(82, 96, 109, 0.12) 0%,
    rgba(255, 255, 255, 0.62) 48%,
    rgba(82, 96, 109, 0.12) 100%
  );
  background-size: 260px 100%;
  animation: ${shimmer} 1.25s infinite linear;
  border-radius: ${({ theme }) => theme.radii.sm};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const SkeletonBar = styled(SkeletonSurface)`
  height: 44px;
  margin-bottom: 20px;
`;

const SkeletonToolbar = styled(SkeletonSurface)`
  height: 58px;
  margin-bottom: 20px;
`;

const SkeletonCard = styled(SkeletonSurface)`
  height: 320px;
`;
