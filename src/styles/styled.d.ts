import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryHover: string;
      background: string;
      surface: string;
      border: string;
      text: string;
      textMuted: string;
      danger: string;
      success: string;
    };
    radii: {
      sm: string;
      md: string;
      lg: string;
    };
    shadows: {
      card: string;
      cardHover: string;
    };
    breakpoints: {
      tablet: string;
      desktop: string;
    };
  }
}
