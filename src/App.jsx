import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import SearchResults from './SearchResults';
import { FiSearch } from 'react-icons/fi';

function Home({ isDark, onToggleTheme }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleTagClick = (tag) => {
    navigate(`/search?q=${encodeURIComponent(tag)}`);
  };

  return (
    <div className={isDark ? 'theme-dark' : 'theme-light'}>
      <Navbar isDark={isDark} onToggleTheme={onToggleTheme} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', marginTop: '15%', padding: '0 1rem'}}>
        <h1>Stop searching. Start building.</h1>
        <p>DevOpsWiki curates the best resources across CI/CD, containers, cloud, and more.</p>

        <div className="hero-search-wrapper">
          <FiSearch className="hero-search-icon" />
          <input
            type="text"
            className="hero-search-bar"
            placeholder="Search for CI/CD, Docker, Kubernetes, Terraform..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
          />
        </div>

        <div className="hero-tags">
          {['Terraform', 'Ansible', 'Jenkins', 'Grafana', 'Docker', 'Kubernetes'].map(tag => (
            <span key={tag} className="hero-tag" onClick={() => handleTagClick(tag)}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <footer className="footer">
        <span>DevOpsWiki &copy; 2026</span>
        <a href="/" className="footer-link">Contact Us</a>
      </footer>
    </div>
  );
}

function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <Routes>
      <Route path="/" element={<Home isDark={isDark} onToggleTheme={toggleTheme} />} />
      <Route path="/search" element={<SearchResults isDark={isDark} onToggleTheme={toggleTheme} />} />
    </Routes>
  );
}

export default App;