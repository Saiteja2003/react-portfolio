const LINKS = [
  ["#work", "Work"],
  ["#method", "Method"],
  ["#path", "Path"],
  ["#contact", "Contact"],
];

export default function Nav({ go, rope, onToggleRope }) {
  return (
    <header className="nav">
      <a href="#top" className="nav__mark" onClick={(e) => go(e, "#top")} aria-label="Saiteja Challa, back to top">
        <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
          <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M9 22 C 12 8, 20 24, 23 10" fill="none" stroke="var(--signal)" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span>Saiteja Challa</span>
      </a>
      <nav aria-label="Sections">
        <ul className="nav__links">
          {LINKS.map(([href, label]) => (
            <li key={href}>
              <a href={href} onClick={(e) => go(e, href)} data-magnetic>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {rope !== null && (
        <button className="nav__toggle" onClick={onToggleRope} aria-pressed={rope} data-magnetic>
          <span className="nav__toggle-dot" aria-hidden="true" />
          Thread {rope ? "on" : "off"}
        </button>
      )}
    </header>
  );
}
