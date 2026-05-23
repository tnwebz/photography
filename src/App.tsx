import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { CategoryGalleryPage } from '@/pages/CategoryGalleryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections/:slug" element={<CategoryGalleryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
