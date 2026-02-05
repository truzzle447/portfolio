import "./Header.css";

export default function Header({ themeLabel, onToggleTheme, isDark }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <span className="brand-title">Tshepang Matiting</span>
          <span className="brand-subtitle">Calm systems. Real use.</span>
        </div>
        <button
          className="theme-toggle"
          type="button"
          onClick={onToggleTheme}
          aria-pressed={isDark}
          aria-label="Toggle color theme"
        >
          {themeLabel}
        </button>
      </div>
    </header>
  );
}
