import styled from 'styled-components';
import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <Page>
      {/* ── Developer profile section ── */}
      <ProfileCard>
        <Avatar>👨‍💻</Avatar>
        <ProfileInfo>
          <h1>About Me</h1>
          <Role>Front-End Developer</Role>
          <Bio>
            I'm a front-end developer with a passion for building clean, interactive,
            and accessible web experiences. I enjoy turning ideas into polished React
            applications — from component architecture to smooth animations and
            real-world data integrations.
          </Bio>
          <Links>
            <SocialLink href="https://github.com/SnehaSharma7" target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/sneha7" target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </SocialLink>
          </Links>
        </ProfileInfo>
      </ProfileCard>

      {/* ── About the project ── */}
      <Section>
        <h2>About this Project</h2>
        <p>
          <strong>PetGallery</strong> is a take-home challenge project built with React 19,
          TypeScript, and styled-components. It pulls real pet breed data from public APIs,
          presents them in a searchable, sortable, paginated gallery, and lets you
          select and download images as a ZIP archive.
        </p>
      </Section>

      {/* ── App features grid ── */}
      <Section>
        <h2>Features</h2>
        <FeatureList>
          {([
            ['🔍', 'Search', 'Filter pets by name or description in real time.'],
            ['⬆️', 'Sort', 'Sort by name A–Z / Z–A or by date newest / oldest.'],
            ['☑️', 'Multi-select', 'Select multiple pets and download as a single ZIP.'],
            ['📄', 'Pagination', 'Navigate results across pages (12 per page).'],
            ['📱', 'Responsive', '1 column on mobile, 2 on tablet, 4 on desktop.'],
            ['💾', 'Persistent', 'Selection is saved in localStorage across page visits.'],
            ['⚡', 'Animations', 'Skeleton loading, staggered entrance, and hover effects.'],
            ['🔗', 'Detail View', 'Each pet has its own route at /pets/:id.'],
          ] as [string, string, string][]).map(([icon, label, desc]) => (
            <FeatureCard key={label}>
              <FeatureIcon>{icon}</FeatureIcon>
              <FeatureLabel>{label}</FeatureLabel>
              <FeatureDesc>{desc}</FeatureDesc>
            </FeatureCard>
          ))}
        </FeatureList>
      </Section>

      {/* ── Tech stack ── */}
      <Section>
        <h2>Technology Stack</h2>
        <Stack>
          {['React 19', 'TypeScript', 'Vite', 'styled-components', 'react-router-dom', 'JSZip', 'TheCatAPI', 'Dog CEO API', 'Wikipedia API'].map(
            (tech) => <Tag key={tech}>{tech}</Tag>
          )}
        </Stack>
      </Section>

      <GalleryLink to="/">← Back to Gallery</GalleryLink>
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

const ProfileCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 32px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 36px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Avatar = styled.div`
  font-size: 72px;
  flex-shrink: 0;
  line-height: 1;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  h1 {
    font-size: 32px;
    font-weight: 700;
    margin: 0;
  }
`;

const Role = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const Bio = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  max-width: 560px;
`;

const Links = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  padding: 6px 14px;
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const Section = styled.section`
  h2 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.text};
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
  border: 1px solid ${({ theme }) => theme.colors.border};
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

const GalleryLink = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    text-decoration: underline;
  }
`;
