import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, styled, keyframes } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { SelectionProvider } from './context/SelectionContext';
import { Navbar } from './components/Toolbar/Navbar';
import { GalleryPage } from './pages/Gallery/GalleryPage';
import { DetailPage } from './pages/Detail/DetailPage';
import { AboutPage } from './pages/About/AboutPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

/**
 * Inner component so useLocation() can be called inside BrowserRouter context.
 * The `key` on RouteViewport triggers the entrance animation on every navigation.
 */
function AppContent() {
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {/* SelectionProvider wraps all routes so selection persists across navigation */}
      <SelectionProvider>
        <Navbar />
        <RouteViewport key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<GalleryPage />} />
            <Route path="/pets/:id" element={<DetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* 404 – shown for any unrecognised path */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </RouteViewport>
      </SelectionProvider>
    </ThemeProvider>
  );
}

// ---------------------------------------------------------------------------
// Route transition animation
// ---------------------------------------------------------------------------

const routeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
`;

/** Wraps every page so it fades + slides in on navigation. */
const RouteViewport = styled.div`
  animation: ${routeIn} 320ms ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
