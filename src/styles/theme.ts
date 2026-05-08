import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#6C63FF',
    primaryHover: '#574fd6',
    background: '#F4F6FB',
    surface: '#FFFFFF',
    border: '#E0E4EF',
    text: '#1A1A2E',
    textMuted: '#6B7280',
    danger: '#EF4444',
    success: '#10B981',
  },
  radii: {
    sm: '6px',
    md: '12px',
    lg: '20px',
  },
  shadows: {
    card: '0 2px 8px rgba(0,0,0,0.08)',
    cardHover: '0 8px 24px rgba(108,99,255,0.18)',
  },
  breakpoints: {
    tablet: '640px',
    desktop: '1024px',
  },
};
