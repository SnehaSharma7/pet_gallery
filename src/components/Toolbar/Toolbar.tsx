import styled from 'styled-components';
import type { Pet } from '../../types/Pet';
import { useSelection } from '../../context/SelectionContext';
import { formatFileSize } from '../../utils/petUtils';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface ToolbarProps {
  /** All currently visible (filtered + sorted) pets — used for Select All */
  visiblePets: Pet[];
  /** All pets loaded — used to look up file sizes for selected items */
  allPets: Pet[];
}

export function Toolbar({ visiblePets, allPets }: ToolbarProps) {
  const { count, selectAll, clear, totalSize, selectedIds } = useSelection();
  const sizeEstimate = totalSize(allPets);

  const handleDownload = async () => {
    const selected = allPets.filter((p) => selectedIds.has(p.id));
    if (selected.length === 0) return;

    if (selected.length === 1) {
      // Direct download for single file
      saveAs(selected[0].imageUrl, `${selected[0].title}.jpg`);
      return;
    }

    // Zip multiple files
    const zip = new JSZip();
    const folder = zip.folder('pets')!;

    await Promise.all(
      selected.map(async (pet) => {
        const res = await fetch(pet.imageUrl);
        const blob = await res.blob();
        folder.file(`${pet.title.replace(/[^a-z0-9]/gi, '_')}.jpg`, blob);
      })
    );

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'pet-selection.zip');
  };

  return (
    <Bar>
      <Left>
        <SelectBtn onClick={() => selectAll(visiblePets)}>Select All</SelectBtn>
        <ClearBtn onClick={clear} disabled={count === 0}>
          Clear
        </ClearBtn>
      </Left>
      <Right>
        {count > 0 && (
          <Info>
            <strong>{count}</strong> selected &bull; ~{formatFileSize(sizeEstimate)}
          </Info>
        )}
        <DownloadBtn onClick={handleDownload} disabled={count === 0}>
          Download {count > 0 ? `(${count})` : ''}
        </DownloadBtn>
      </Right>
    </Bar>
  );
}

// ---------------------------------------------------------------------------
// Styled components
// ---------------------------------------------------------------------------

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: 20px;
`;

const Left = styled.div`
  display: flex;
  gap: 8px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Info = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const BaseBtn = styled.button`
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 13px;
  font-weight: 600;
  transition: background 0.15s, opacity 0.15s;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const SelectBtn = styled(BaseBtn)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const ClearBtn = styled(BaseBtn)`
  background: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};

  &:hover:not(:disabled) {
    background: #d0d4e0;
  }
`;

const DownloadBtn = styled(BaseBtn)`
  background: ${({ theme }) => theme.colors.success};
  color: white;

  &:hover:not(:disabled) {
    background: #059669;
  }
`;
