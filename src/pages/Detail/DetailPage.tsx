import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPetById } from '../../services/api';
import { useData } from '../../hooks/useData';
import { useSelection } from '../../context/SelectionContext';
import { useCallback } from 'react';

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isSelected, toggle } = useSelection();

  // Memoize the fetcher so useData's trigger doesn't re-fetch on every render
  const fetcher = useCallback(() => fetchPetById(id!), [id]);
  const { data: pet, loading, error } = useData(fetcher);

  if (loading) return <StateMsg>Loading…</StateMsg>;
  if (error || !pet) return <StateMsg $error>Pet not found.</StateMsg>;

  const selected = isSelected(pet.id);
  const date = new Date(pet.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Page>
      <BackBtn onClick={() => navigate(-1)} aria-label="Back to gallery">
        ← Back
      </BackBtn>

      <Card>
        <ImageSection>
          <img src={pet.imageUrl} alt={pet.title} />
        </ImageSection>

        <InfoSection>
          <Title>{pet.title}</Title>
          <DateLine>Added {date}</DateLine>
          <Description>{pet.description}</Description>

          <SelectToggle
            $selected={selected}
            onClick={() => toggle(pet.id)}
          >
            {selected ? '✓ Selected' : 'Add to Selection'}
          </SelectToggle>
        </InfoSection>
      </Card>
    </Page>
  );
}

// ---------------------------------------------------------------------------
// Styled components
// ---------------------------------------------------------------------------

const Page = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 24px 64px;
`;

const BackBtn = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 24px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 0;

  &:hover {
    text-decoration: underline;
  }
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.cardHover};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImageSection = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    min-height: 300px;
  }
`;

const InfoSection = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
`;

const DateLine = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Description = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

const SelectToggle = styled.button<{ $selected: boolean }>`
  padding: 12px 24px;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 14px;
  font-weight: 600;
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.success : theme.colors.primary};
  color: white;
  transition: background 0.15s;
  align-self: flex-start;

  &:hover {
    background: ${({ theme, $selected }) =>
      $selected ? '#059669' : theme.colors.primaryHover};
  }
`;

const StateMsg = styled.div<{ $error?: boolean }>`
  text-align: center;
  padding: 80px 24px;
  font-size: 18px;
  color: ${({ theme, $error }) =>
    $error ? theme.colors.danger : theme.colors.textMuted};
`;
