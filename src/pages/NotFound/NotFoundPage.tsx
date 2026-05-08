import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

/**
 * Shown for any unrecognised URL.
 * Provides clear navigation back to the gallery.
 */
export function NotFoundPage() {
  return (
    <Page>
      <Code>404</Code>
      <Title>Page Not Found</Title>
      <Description>
        The page you're looking for doesn't exist or has been moved.
      </Description>
      <HomeLink to="/">← Back to Gallery</HomeLink>
    </Page>
  );
}

// ---------------------------------------------------------------------------
// Styled components
// ---------------------------------------------------------------------------

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px);
  padding: 40px 24px;
  text-align: center;
  gap: 16px;
`;

const Code = styled.h1`
  font-size: clamp(80px, 20vw, 140px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
  opacity: 0.18;
  animation: ${float} 3.6s ease-in-out infinite;
  user-select: none;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-top: -24px;
`;

const Description = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 340px;
  line-height: 1.7;
`;

const HomeLink = styled(Link)`
  margin-top: 8px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background: ${({ theme }) => theme.colors.primary};
  padding: 10px 24px;
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
  }
`;
