import styled from 'styled-components';
import type { SortOption } from '../../types/Pet';

interface SearchSortProps {
  query: string;
  sort: SortOption;
  onQueryChange: (q: string) => void;
  onSortChange: (s: SortOption) => void;
}

export function SearchSort({ query, sort, onQueryChange, onSortChange }: SearchSortProps) {
  return (
    <Bar>
      <SearchWrapper>
        <SearchIcon aria-hidden>🔍</SearchIcon>
        <SearchInput
          type="search"
          placeholder="Search by name or description…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search pets"
        />
      </SearchWrapper>
      <SortSelect
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        aria-label="Sort pets"
      >
        <option value="name-asc">Name A → Z</option>
        <option value="name-desc">Name Z → A</option>
        <option value="date-newest">Newest First</option>
        <option value="date-oldest">Oldest First</option>
      </SortSelect>
    </Bar>
  );
}

// ---------------------------------------------------------------------------
// Styled components
// ---------------------------------------------------------------------------

const Bar = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  animation: controlsIn 280ms ease-out;

  @keyframes controlsIn {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 14px 10px 36px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: rgba(255, 253, 250, 0.94);
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const SortSelect = styled.select`
  padding: 10px 14px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: rgba(255, 253, 250, 0.94);
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.1);
  }
`;
