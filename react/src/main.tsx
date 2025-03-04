import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthContextProvider } from './hooks/AuthContext';
import './global.css'

// Pages
import HomePage from './pages/Home';

function App() {
  return (
    <StrictMode>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<App />)
