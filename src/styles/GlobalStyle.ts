import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@600;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    background-image:
      radial-gradient(circle at 15% 18%, rgba(15, 118, 110, 0.16), transparent 42%),
      radial-gradient(circle at 88% 6%, rgba(245, 158, 11, 0.12), transparent 34%),
      linear-gradient(180deg, rgba(255, 253, 250, 0.9), rgba(247, 243, 232, 0.94));
    background-attachment: fixed;
  }

  h1, h2, h3 {
    font-family: 'Space Grotesk', 'DM Sans', sans-serif;
    letter-spacing: -0.02em;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ::selection {
    background: rgba(15, 118, 110, 0.2);
  }

  img {
    display: block;
    max-width: 100%;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font: inherit;
  }

  input, select {
    font: inherit;
  }

  :focus-visible {
    outline: 2px solid rgba(15, 118, 110, 0.72);
    outline-offset: 2px;
  }
`;
