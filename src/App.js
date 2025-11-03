import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check system preference or localStorage
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    fetchIPInfo();
  }, []);

  useEffect(() => {
    // Save theme preference and apply to document
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const fetchIPInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Using ipapi.co for IP geolocation (free tier)
      const response = await fetch('https://ipapi.co/json/');
      
      if (!response.ok) {
        throw new Error('Failed to fetch IP information');
      }
      
      const data = await response.json();
      setIpData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchIPInfo();
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (loading) {
    return (
      <div className="app">
        <nav className="nav">
          <div className="nav-content">
            <h1>IP Info</h1>
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading your network information</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <nav className="nav">
          <div className="nav-content">
            <h1>IP Info</h1>
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>
        <div className="container">
          <div className="error">
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <button onClick={refreshData} className="refresh-btn">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-content">
          <h1>IP Info</h1>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      <div className="container">
        <section className="hero">
          <h1>Your Network Identity</h1>
          <p>Discover your public IP address and location details</p>
        </section>

        <section className="ip-section">
          <div className="ip-label">Your Public IP Address</div>
          <div className="ip-address">{ipData?.ip}</div>
          <div className="ip-version">
            {ipData?.version === 'IPv4' ? 'IPv4' : 'IPv6'}
          </div>
        </section>

        <div className="info-grid">
          <div className="info-card">
            <div className="info-header">
              <div className="info-icon">📍</div>
              <div className="info-title">Location</div>
            </div>
            <div className="info-primary">{ipData?.city}</div>
            <div className="info-secondary">{ipData?.region}, {ipData?.country_name}</div>
            <div className="info-tertiary">{ipData?.postal}</div>
          </div>

          <div className="info-card">
            <div className="info-header">
              <div className="info-icon">🌍</div>
              <div className="info-title">Country</div>
            </div>
            <div className="info-primary">{ipData?.country_name}</div>
            <div className="info-secondary">{ipData?.country_code}</div>
            <div className="info-tertiary">{ipData?.continent_code}</div>
          </div>

          <div className="info-card">
            <div className="info-header">
              <div className="info-icon">🏢</div>
              <div className="info-title">Internet Provider</div>
            </div>
            <div className="info-primary">{ipData?.org?.split(' ')[0] || 'Unknown'}</div>
            <div className="info-secondary">{ipData?.org}</div>
            <div className="info-tertiary">AS{ipData?.asn}</div>
          </div>

          <div className="info-card">
            <div className="info-header">
              <div className="info-icon">🕐</div>
              <div className="info-title">Timezone</div>
            </div>
            <div className="info-primary">{ipData?.timezone?.split('/')[1] || ipData?.timezone}</div>
            <div className="info-secondary">{ipData?.timezone}</div>
            <div className="info-tertiary">UTC {ipData?.utc_offset}</div>
          </div>

          <div className="info-card">
            <div className="info-header">
              <div className="info-icon">💰</div>
              <div className="info-title">Currency</div>
            </div>
            <div className="info-primary">{ipData?.currency}</div>
            <div className="info-secondary">{ipData?.currency_name}</div>
            <div className="info-tertiary">{ipData?.currency_symbol}</div>
          </div>

          <div className="info-card">
            <div className="info-header">
              <div className="info-icon">🗣️</div>
              <div className="info-title">Languages</div>
            </div>
            <div className="info-primary">{ipData?.languages?.split(',')[0] || 'Unknown'}</div>
            <div className="info-secondary">{ipData?.languages}</div>
          </div>
        </div>

        <div className="actions">
          <button onClick={refreshData} className="refresh-btn">
            Refresh
          </button>
        </div>

        <footer className="footer">
          <p>Data provided by ipapi.co</p>
        </footer>
      </div>
    </div>
  );
}

export default App;