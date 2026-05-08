import styled, { css, keyframes } from 'styled-components';
import { useState } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';
import type { Pet } from '../../types/Pet';
import { useSelection } from '../../context/SelectionContext';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  pet: Pet;
}

export function PetCard({ pet }: CardProps) {
  const { isSelected, toggle } = useSelection();
  const selected = isSelected(pet.id);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const handleClick = (e: MouseEvent) => {
    // Clicking the checkbox area toggles selection; anywhere else navigates
    if ((e.target as HTMLElement).closest('[data-checkbox]')) return;
    navigate(`/pets/${pet.id}`);
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    toggle(pet.id);
  };

  const date = new Date(pet.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <CardWrapper $selected={selected} onClick={handleClick} role="article" aria-label={pet.title}>
      <ImageWrapper>
        <CardImage
          src={pet.imageUrl}
          alt={pet.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          $loaded={loaded}
        />
        <CheckboxOverlay data-checkbox>
          <HiddenCheckbox
            type="checkbox"
            checked={selected}
            onChange={handleCheck}
            aria-label={`Select ${pet.title}`}
          />
          <VisualCheckbox $checked={selected} />
        </CheckboxOverlay>
        {selected && <SelectedBadge>Selected</SelectedBadge>}
      </ImageWrapper>
      <CardBody>
        <CardTitle>{pet.title}</CardTitle>
        <CardDesc>{pet.description}</CardDesc>
        <CardDate>{date}</CardDate>
      </CardBody>
    </CardWrapper>
  );
}

// ---------------------------------------------------------------------------
// Styled components
// ---------------------------------------------------------------------------

const CardWrapper = styled.article<{ $selected: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  border: 2px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.primary : 'transparent'};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    transform: translateY(-5px);
  }

  ${({ $selected, theme }) =>
    $selected &&
    css`
      background: ${theme.colors.background};
      box-shadow: 0 14px 30px rgba(15, 118, 110, 0.16);
    `}
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 75%; /* 4:3 ratio */
  background: ${({ theme }) => theme.colors.border};
  overflow: hidden;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.035);
    transition: transform 0.45s ease;
  }

  ${CardWrapper}:hover & img {
    transform: scale(1.075);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%);
    transform: translateX(-140%);
    transition: transform 0.6s ease;
    pointer-events: none;
  }

  ${CardWrapper}:hover &::after {
    transform: translateX(140%);
  }
`;

const revealImage = keyframes`
  from {
    opacity: 0;
    filter: blur(6px);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
`;

const CardImage = styled.img<{ $loaded: boolean }>`
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0.15)};
  animation: ${({ $loaded }) => ($loaded ? revealImage : 'none')} 260ms ease-out;
`;

const CheckboxOverlay = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 2;
`;

const VisualCheckbox = styled.div<{ $checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 2px solid
    ${({ theme, $checked }) =>
      $checked ? theme.colors.primary : 'rgba(255,255,255,0.85)'};
  background: ${({ theme, $checked }) =>
    $checked ? theme.colors.primary : 'rgba(255,255,255,0.7)'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  backdrop-filter: blur(4px);

  &::after {
    content: '✓';
    color: white;
    font-size: 13px;
    font-weight: 700;
    display: ${({ $checked }) => ($checked ? 'block' : 'none')};
  }
`;

const SelectedBadge = styled.span`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
`;

const CardBody = styled.div`
  padding: 14px 16px 18px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardDesc = styled.p`
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardDate = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
`;
