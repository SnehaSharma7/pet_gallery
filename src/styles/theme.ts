import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#0f766e',
    primaryHover: '#115e59',
    background: '#f7f3e8',
    surface: '#fffdfa',
    border: '#ddd7c6',
    text: '#1f2a37',
    textMuted: '#52606d',
    danger: '#c53030',
    success: '#2f855a',
  },
  radii: {
    sm: '8px',
    md: '14px',
    lg: '24px',
  },
  shadows: {
    card: '0 10px 30px rgba(31, 42, 55, 0.08)',
    cardHover: '0 20px 48px rgba(15, 118, 110, 0.24)',
  },
  breakpoints: {
    tablet: '640px',
    desktop: '1024px',
  },
};
