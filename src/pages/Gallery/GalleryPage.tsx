import { useMemo, useState } from 'react';
import styled from 'styled-components';
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

  if (loading) return <StateMsg>Loading pets…</StateMsg>;
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

const Page = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px 64px;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 24px;

  h1 {
    font-size: 28px;
    font-weight: 700;
  }
`;

const ResultCount = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

/** Responsive grid: 1 col → 2 col → 4 col */
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

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
