import { useEffect, useState } from "react";

const LINKS = [
  ["#work", "Work"],
  ["#approach", "Approach"],
  ["#background", "Background"],
  ["#contact", "Contact"],
];

export default function Nav({ go }) {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Which section is under the middle of the viewport.
  useEffect(() => {
    const targets = LINKS.map(([href]) => document.querySelector(href)).filter(
      Boolean,
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    const hero = document.querySelector(".hero");
    const heroIo = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setActive("");
      },
      { rootMargin: "0px 0px -60% 0px" },
    );
    if (hero) heroIo.observe(hero);
    return () => {
      io.disconnect();
      heroIo.disconnect();
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 24);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <a
        href="#top"
        className="nav__mark"
        onClick={(e) => go(e, "#top")}
        aria-label="Saiteja Challa, back to top"
      >
        <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
          <circle
            cx="16"
            cy="16"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M9 22 C 12 8, 20 24, 23 10"
            fill="none"
            stroke="var(--signal)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        <span>Saiteja Challa</span>
      </a>
      <nav aria-label="Sections">
        <ul className="nav__links">
          {LINKS.map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => go(e, href)}
                aria-current={active === href ? "location" : undefined}
                className={active === href ? "is-active" : ""}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a
        className="nav__cta"
        href="#contact"
        onClick={(e) => go(e, "#contact")}
        data-magnetic
      >
        Get in touch
      </a>
    </header>
  );
}
