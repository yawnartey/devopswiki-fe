import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './App.css';

function SearchResults({ isDark, onToggleTheme }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;
    setLoading(true);
    axios.get('http://devopswiki.info:8000/api/search', { params: { q: query } })
      .then(res => setResults(res.data))
      .catch(err => console.error('Search failed:', err))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className={isDark ? 'theme-dark' : 'theme-light'}>
      <Navbar isDark={isDark} onToggleTheme={onToggleTheme} />

      <div style={{ maxWidth: '750px', margin: '2rem auto', padding: '0 1rem' }}>

        {!loading && results.length > 0 && (
          <div className="results-list">
            {results.map(resource => {
                const domain = new URL(resource.url).hostname;
                const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
                return (
                    <div key={resource.id} className="result-item">
                    <div className="result-source-row">
                        <div className="result-favicon-wrapper">
                        <img src={faviconUrl} alt={domain} className="result-favicon" />
                        </div>
                        <div className="result-source">{resource.url}</div>
                    </div>
                    <a href={resource.url} target="_blank" rel="noreferrer" className="result-title">
                        {resource.title}
                    </a>
                    <p className="result-description">{resource.description}</p>
                    </div>
                );
                })}
          </div>
        )}

        {!loading && results.length === 0 && (
          <p className="results-status">No results found for "{query}"</p>
        )}
      </div>

      <footer className="footer">
        <span>DevOpsWiki &copy; 2026</span>
        <a href="/contact" className="footer-link">Contact Us</a>
      </footer>
    </div>
  );
}

export default SearchResults;