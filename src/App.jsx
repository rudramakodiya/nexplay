
import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

const ARCADE_SOURCES = [
  {
    id: 'quenq-arcade',
    title: 'Quenq Arcade',
    url: 'https://quenq.com/',
    categoryKey: 'general',
    categoryLabel: 'General & Casual Arcade',
    description:
      'Explore browser games, casual challenges, action games, and instant-play experiences.',
    tags: ['Web Games', 'Casual', 'Action', 'Instant Play'],
    accent: 'purple',
    badge: 'Multi-Genre Portal'
  },
  {
    id: 'mathplayzone-arcade',
    title: 'MathPlayZone Arcade',
    url: 'https://mathplayzone.com/arcade',
    categoryKey: 'math-logic',
    categoryLabel: 'Math & Logic Arcade',
    description:
      'Discover numerical puzzles, logic challenges, and educational arcade games.',
    tags: ['Logic Puzzles', 'Brain Training', 'Math Arcade', 'Educational'],
    accent: 'cyan',
    badge: 'Logic & Puzzle Portal'
  }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('nexplay_arcade_favorites') || '[]'
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        'nexplay_arcade_favorites',
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.warn('Could not save favorites', error);
    }
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const filteredSources = useMemo(() => {
    return ARCADE_SOURCES.filter((source) => {
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        source.title.toLowerCase().includes(query) ||
        source.description.toLowerCase().includes(query) ||
        source.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        source.categoryLabel.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'favorites'
          ? favorites.includes(source.id)
          : source.categoryKey === selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, favorites]);

  const scrollToSection = (id) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="nexplay-root">
      <div className="ambient-orb glow-cyan" />
      <div className="ambient-orb glow-purple" />
      <div className="ambient-orb glow-blue" />

      <header className="navbar">
        <div className="nav-inner">
          <button
            className="brand-logo"
            onClick={() => scrollToSection('home')}
            aria-label="NEXPLAY home"
          >
            <span className="brand-gem">
              <span className="gem-symbol">❖</span>
            </span>
            <span className="brand-names">
              <span className="brand-main">NEXPLAY</span>
              <span className="brand-sub">ARCADE</span>
            </span>
          </button>

          <nav className="desktop-nav">
            {['home', 'arcades', 'about'].map((id) => (
              <button
                key={id}
                className={`nav-link ${activeNav === id ? 'active' : ''}`}
                onClick={() => scrollToSection(id)}
              >
                {id === 'arcades'
                  ? 'Arcades'
                  : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </nav>

          <div className="nav-extras">
            <button
              className={`fav-counter-btn ${
                selectedCategory === 'favorites' ? 'active' : ''
              }`}
              onClick={() => {
                setSelectedCategory((current) =>
                  current === 'favorites' ? 'all' : 'favorites'
                );
                scrollToSection('arcades');
              }}
              aria-label="View favorite arcades"
            >
              <span className="heart-icon">♥</span>
              <span>{favorites.length}</span>
            </button>

            <button
              className="mobile-hamburger"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="mobile-dropdown">
            {['home', 'arcades', 'about'].map((id) => (
              <button
                key={id}
                className="mobile-dropdown-btn"
                onClick={() => scrollToSection(id)}
              >
                {id === 'arcades'
                  ? 'Arcades'
                  : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-pill">
            <span className="pulse-dot" />
            CURATED BROWSER GAMING LAUNCHPAD
          </div>

          <h1 className="hero-heading">
            YOUR NEXT GAME
            <br />
            <span className="neon-gradient-text">IS HERE</span>
          </h1>

          <p className="hero-subheading">
            Your gateway to browser gaming. Discover arcade portals,
            search categories, and launch games directly from their
            original websites.
          </p>

          <div className="hero-actions">
            <button
              className="neon-primary-btn"
              onClick={() => scrollToSection('arcades')}
            >
              Explore Arcades
            </button>
            <button
              className="neon-secondary-btn"
              onClick={() => scrollToSection('about')}
            >
              How It Works
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-value">2</span>
              <span className="stat-label">Arcade Portals</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-card">
              <span className="stat-value">Direct</span>
              <span className="stat-label">External Launch</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-card">
              <span className="stat-value">Free</span>
              <span className="stat-label">To Access This Hub</span>
            </div>
          </div>
        </section>

        <section id="arcades" className="directory-section">
          <div className="directory-header">
            <div>
              <span className="section-eyebrow">ARCADE DIRECTORY</span>
              <h2 className="section-title">GAMING ARCADES</h2>
            </div>
            <div className="results-counter">
              Showing <strong>{filteredSources.length}</strong> of{' '}
              {ARCADE_SOURCES.length} sources
            </div>
          </div>

          <div className="directory-controls">
            <div className="search-wrapper">
              <span className="search-glyph">🔍</span>
              <input
                className="search-field"
                type="search"
                placeholder="Search arcades, tags, or categories..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label="Search arcades"
              />
              {searchQuery && (
                <button
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="category-filters">
              {[
                { id: 'all', label: 'All Arcades' },
                { id: 'general', label: 'Quenq Arcade' },
                { id: 'math-logic', label: 'MathPlayZone' },
                { id: 'favorites', label: `♥ Favourites (${favorites.length})` }
              ].map((category) => (
                <button
                  key={category.id}
                  className={`filter-tab ${
                    selectedCategory === category.id
                      ? category.id === 'favorites'
                        ? 'active-fav'
                        : 'active'
                      : ''
                  }`}
                  onClick={() =>
                    setSelectedCategory((current) =>
                      current === category.id && category.id === 'favorites'
                        ? 'all'
                        : category.id
                    )
                  }
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {filteredSources.length > 0 ? (
            <div className="arcade-grid">
              {filteredSources.map((source) => {
                const isFavorite = favorites.includes(source.id);
                const isCyan = source.accent === 'cyan';

                return (
                  <article
                    key={source.id}
                    className={`arcade-card ${
                      isCyan ? 'accent-cyan' : 'accent-purple'
                    }`}
                  >
                    <div className="card-banner">
                      <div className="banner-pattern">
                        <svg
                          className="banner-svg"
                          viewBox="0 0 400 160"
                          fill="none"
                          aria-hidden="true"
                        >
                          <rect
                            x="20"
                            y="20"
                            width="360"
                            height="120"
                            rx="8"
                            stroke={isCyan ? '#00f5ff' : '#a855f7'}
                            strokeWidth="1.5"
                            strokeOpacity=".3"
                          />
                          <path
                            d="M50 140 L120 40 L190 140 L260 40 L330 140"
                            stroke={isCyan ? '#00d4ff' : '#c084fc'}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeOpacity=".45"
                          />
                          <circle
                            cx="200"
                            cy="70"
                            r="36"
                            fill={
                              isCyan
                                ? 'rgba(0,245,255,.12)'
                                : 'rgba(168,85,247,.12)'
                            }
                            stroke={isCyan ? '#00f5ff' : '#a855f7'}
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>

                      <span className="card-portal-badge">
                        {source.badge}
                      </span>

                      <button
                        className={`fav-toggle-btn ${
                          isFavorite ? 'favorited' : ''
                        }`}
                        onClick={() => toggleFavorite(source.id)}
                        aria-label={
                          isFavorite
                            ? `Remove ${source.title} from favourites`
                            : `Add ${source.title} to favourites`
                        }
                      >
                        ♥
                      </button>
                    </div>

                    <div className="card-body">
                      <div className="card-title-row">
                        <h3 className="card-title">{source.title}</h3>
                        <span className="card-category-indicator">
                          {source.categoryLabel}
                        </span>
                      </div>

                      <p className="card-description">
                        {source.description}
                      </p>

                      <div className="card-tags-list">
                        {source.tags.map((tag) => (
                          <span key={tag} className="tag-pill">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="card-footer">
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="open-arcade-btn"
                        >
                          <span>Open Arcade</span>
                          <span className="btn-arrow">↗</span>
                        </a>
                        <span className="launch-notice">
                          Opens the external website
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-results-box">
              <div className="empty-icon-ring">🎮</div>
              <h3 className="empty-title">No Arcades Found</h3>
              <p className="empty-description">
                No arcade matched your search or selected filter.
                Try a different keyword or reset your filters.
              </p>
              <button
                className="reset-filters-btn"
                onClick={clearFilters}
              >
                Reset Search & Filters
              </button>
            </div>
          )}
        </section>

        <section id="about" className="about-section">
          <div className="about-panel">
            <span className="section-eyebrow">ABOUT THE PLATFORM</span>
            <h2 className="section-title">DIRECT ACCESS. ZERO CLUTTER.</h2>
            <p className="about-lead">
              NEXPLAY ARCADE brings browser gaming destinations together
              in one convenient launchpad. Games open on their original
              websites rather than being copied or hosted here.
            </p>

            <div className="about-highlights-grid">
              <div className="about-feature-card">
                <div className="feature-marker cyan-marker">01</div>
                <h4>Direct Arcade Links</h4>
                <p>
                  Open Quenq and MathPlayZone in a new browser tab.
                </p>
              </div>

              <div className="about-feature-card">
                <div className="feature-marker purple-marker">02</div>
                <h4>Saved Favourites</h4>
                <p>
                  Your favourite portals are saved in your browser.
                </p>
              </div>

              <div className="about-feature-card">
                <div className="feature-marker blue-marker">03</div>
                <h4>Quick Search</h4>
                <p>
                  Search portal names, tags, and arcade categories.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand-col">
            <div className="brand-logo footer-logo">
              <span className="brand-gem">
                <span className="gem-symbol">❖</span>
              </span>
              <span className="brand-main">NEXPLAY ARCADE</span>
            </div>
            <p className="footer-desc">
              Your gateway to browser-based arcade experiences.
            </p>
          </div>

          <div className="footer-nav-col">
            <span className="footer-heading">NAVIGATION</span>
            <button onClick={() => scrollToSection('home')}>Home</button>
            <button onClick={() => scrollToSection('arcades')}>Arcades Directory</button>
            <button onClick={() => scrollToSection('about')}>About NEXPLAY</button>
          </div>

          <div className="footer-sources-col">
            <span className="footer-heading">ARCADE SOURCES</span>
            <a href="https://quenq.com/" target="_blank" rel="noopener noreferrer">
              Quenq Arcade ↗
            </a>
            <a
              href="https://mathplayzone.com/arcade"
              target="_blank"
              rel="noopener noreferrer"
            >
              MathPlayZone Arcade ↗
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} NEXPLAY ARCADE. Independent arcade directory.
          </p>
        </div>
      </footer>
    </div>
  );
}
