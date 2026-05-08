import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { SelectionProvider } from './context/SelectionContext';
import { Navbar } from './components/Toolbar/Navbar';
import { GalleryPage } from './pages/Gallery/GalleryPage';
import { DetailPage } from './pages/Detail/DetailPage';
import { AboutPage } from './pages/About/AboutPage';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* SelectionProvider wraps all routes so selection persists across navigation */}
        <SelectionProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<GalleryPage />} />
            <Route path="/pets/:id" element={<DetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<GalleryPage />} />
          </Routes>
        </SelectionProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
