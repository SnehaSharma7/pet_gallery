import styled from 'styled-components';
import { useState } from 'react';
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
  const [downloading, setDownloading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const toFileName = (pet: Pet) => `${pet.title.replace(/[^a-z0-9]/gi, '_')}.jpg`;

  const toProxyUrl = (originalUrl: string) => {
    try {
      const parsed = new URL(originalUrl);
      const withoutProtocol = `${parsed.host}${parsed.pathname}${parsed.search}`;
      return `https://images.weserv.nl/?url=${encodeURIComponent(withoutProtocol)}`;
    } catch {
      return originalUrl;
    }
  };

  const fetchImageBlob = async (url: string) => {
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.blob();
  };

  const handleDownload = async () => {
    if (downloading) return;
    const selected = allPets.filter((p) => selectedIds.has(p.id));
    if (selected.length === 0) return;
    setNotice(null);
    setDownloading(true);

    try {
      if (selected.length === 1) {
        // Direct download for single file
        saveAs(selected[0].imageUrl, toFileName(selected[0]));
        return;
      }

      // Zip multiple files when CORS permits blob fetching.
      const zip = new JSZip();
      const folder = zip.folder('pets')!;

      const results = await Promise.all(
        selected.map(async (pet) => {
          try {
            const blob = await fetchImageBlob(pet.imageUrl);
            folder.file(toFileName(pet), blob);
            return true;
          } catch {
            try {
              // Retry via CORS-friendly image proxy for hosts that block direct blob fetches.
              const proxyBlob = await fetchImageBlob(toProxyUrl(pet.imageUrl));
              folder.file(toFileName(pet), proxyBlob);
              return true;
            } catch {
              return false;
            }
          }
        })
      );

      const successful = results.filter(Boolean).length;
      const failed = selected.length - successful;

      if (successful > 0) {
        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, 'pet-selection.zip');

        if (failed > 0) {
          setNotice(`Downloaded ${successful} items as ZIP. ${failed} items were blocked by remote servers.`);
        }
        return;
      }

      setNotice('Could not create ZIP because remote image servers blocked access. Please try a different selection.');
    } finally {
      setDownloading(false);
    }
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
        <DownloadBtn onClick={handleDownload} disabled={count === 0 || downloading}>
          {downloading ? 'Preparing…' : `Download ${count > 0 ? `(${count})` : ''}`}
        </DownloadBtn>
      </Right>
      {notice && <Notice>{notice}</Notice>}
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
  background: rgba(255, 253, 250, 0.9);
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
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

const Notice = styled.p`
  width: 100%;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const BaseBtn = styled.button`
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 13px;
  font-weight: 600;
  transition: background 0.2s, opacity 0.2s, transform 0.2s;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
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
    background: #cbc3ad;
  }
`;

const DownloadBtn = styled(BaseBtn)`
  background: ${({ theme }) => theme.colors.success};
  color: white;

  &:hover:not(:disabled) {
    background: #276749;
  }
`;
