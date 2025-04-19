import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreatePage from './components/CreatePage';
import GalleryPage from './components/GalleryPage';
import DetailPage from './components/DetailPage';
import EditPage from './components/EditPage';
import ErrorBoundary from './ErrorBoundary';
import './styles.css';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="app">
          <nav className="sidebar">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/create">Create a Crewmate!</Link></li>
              <li><Link to="/gallery">Crewmate Gallery</Link></li>
            </ul>
          </nav>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/detail/:id" element={<DetailPage />} />
              <Route path="/edit/:id" element={<EditPage />} />
            </Routes>
          </div>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;