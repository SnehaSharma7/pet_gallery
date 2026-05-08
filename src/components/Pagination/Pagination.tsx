import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Nav aria-label="Pagination">
      <PageBtn
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ‹
      </PageBtn>

      {pages.map((page) => (
        <PageBtn
          key={page}
          $active={page === currentPage}
          onClick={() => onPageChange(page)}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </PageBtn>
      ))}

      <PageBtn
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        ›
      </PageBtn>
    </Nav>
  );
}

// ---------------------------------------------------------------------------
// Styled components
// ---------------------------------------------------------------------------

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 32px;
  flex-wrap: wrap;
`;

const PageBtn = styled.button<{ $active?: boolean }>`
  width: 38px;
  height: 38px;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, $active }) =>
    $active ? 'white' : theme.colors.text};
  border: 1.5px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.border};
  transition: all 0.15s;

  &:hover:not(:disabled) {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primaryHover : theme.colors.background};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;
