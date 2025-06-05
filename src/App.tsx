import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Q1 from './pages/Q1';
import Q2 from './pages/Q2';
import Modelos from './pages/Modelos';
import NotFound from './pages/NotFound';

// Context
import { ContentProvider } from './context/ContentContext';

function App() {
  return (
    <ContentProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="q1" element={<Q1 />} />
              <Route path="q2" element={<Q2 />} />
              <Route path="modelos" element={<Modelos />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Router>
    </ContentProvider>
  );
}

export default App;