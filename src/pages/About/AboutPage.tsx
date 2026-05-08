import styled from 'styled-components';

export function AboutPage() {
  return (
    <Page>
      <Hero>
        <HeroIcon>🐾</HeroIcon>
        <h1>About PetGallery</h1>
        <Subtitle>A curated collection of the world's most adorable pets.</Subtitle>
      </Hero>

      <Section>
        <h2>What is PetGallery?</h2>
        <p>
          PetGallery is a modern image gallery application built with React,
          TypeScript, and styled-components. It lets you browse, search, sort,
          and download photos of pets from our API.
        </p>
      </Section>

      <Section>
        <h2>Features</h2>
        <FeatureList>
          {[
            ['🔍', 'Search', 'Filter pets by name or description in real time.'],
            ['⬆️', 'Sort', 'Sort by name A–Z, Z–A, newest, or oldest.'],
            ['☑️', 'Multi-select', 'Select multiple pets and download them as a zip.'],
            ['📄', 'Pagination', 'Browse results comfortably across pages.'],
            ['📱', 'Responsive', '1–4 column layout adapts to your screen size.'],
            ['💾', 'Persistent', 'Your selection is saved between page visits.'],
          ].map(([icon, label, desc]) => (
            <FeatureCard key={label as string}>
              <FeatureIcon>{icon}</FeatureIcon>
              <FeatureLabel>{label}</FeatureLabel>
              <FeatureDesc>{desc}</FeatureDesc>
            </FeatureCard>
          ))}
        </FeatureList>
      </Section>

      <Section>
        <h2>Technology Stack</h2>
        <Stack>
          {['React 19', 'TypeScript', 'Vite', 'styled-components', 'react-router-dom', 'JSZip'].map(
            (tech) => <Tag key={tech}>{tech}</Tag>
          )}
        </Stack>
      </Section>
    </Page>
  );
}

// ---------------------------------------------------------------------------
// Styled components
// ---------------------------------------------------------------------------

const Page = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px 80px;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const Hero = styled.div`
  text-align: center;

  h1 {
    font-size: 36px;
    font-weight: 700;
    margin: 16px 0 8px;
  }
`;

const HeroIcon = styled.div`
  font-size: 60px;
`;

const Subtitle = styled.p`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Section = styled.section`
  h2 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  p {
    font-size: 15px;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const FeatureIcon = styled.div`
  font-size: 28px;
  margin-bottom: 8px;
`;

const FeatureLabel = styled.h3`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
`;

const FeatureDesc = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`;

const Stack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.span`
  padding: 6px 14px;
  background: ${({ theme }) => theme.colors.background};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;
