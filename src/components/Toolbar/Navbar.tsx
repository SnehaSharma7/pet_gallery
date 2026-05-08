import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useSelection } from '../../context/SelectionContext';

export function Navbar() {
  const { count } = useSelection();
  const { pathname } = useLocation();

  return (
    <Nav>
      <Brand to="/">🐾 PetGallery</Brand>
      <Links>
        <NavLink to="/" $active={pathname === '/'}>
          Gallery
        </NavLink>
        <NavLink to="/about" $active={pathname === '/about'}>
          About
        </NavLink>
        {count > 0 && <Badge>{count}</Badge>}
      </Links>
    </Nav>
  );
}

// ---------------------------------------------------------------------------
// Styled components
// ---------------------------------------------------------------------------

const Nav = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  background: linear-gradient(180deg, rgba(255, 253, 250, 0.95), rgba(255, 253, 250, 0.9));
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 8px 22px rgba(31, 42, 55, 0.06);
`;

const Brand = styled(Link)`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: -0.6px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const Links = styled.nav`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.text};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.background : 'transparent'};
  transition: background 0.2s, color 0.2s, transform 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }
`;

const Badge = styled.span`
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(15, 118, 110, 0.28);
`;
