import { person, projects } from "../data/content";

export default function Hero({ go }) {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <p className="hero__eyebrow mono-label">
        {person.name} — {person.role}, {person.location}
      </p>
      <h1 id="hero-title" className="hero__title" data-anchor>
        <span className="line"><span>I build software</span></span>
        <span className="line"><span>that doesn’t take</span></span>
        <span className="line">
          <span>
            the model’s{" "}
            <em className="hero__em">
              word for it.
              <svg className="hero__underline" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 16 C 60 4, 110 22, 170 12 S 260 6, 298 14" pathLength="1" />
              </svg>
            </em>
          </span>
        </span>
      </h1>

      <div className="hero__foot">
        <p className="hero__intro">{person.intro}</p>
        <ol className="hero__index" aria-label="Selected work">
          {projects.map((p) => (
            <li key={p.id}>
              <a href={`#${p.id}`} onClick={(e) => go(e, `#${p.id}`)}>
                <span className="hero__num">{p.index}</span>
                <span className="hero__name">{p.name}</span>
                <span className="hero__kind">{p.kind}</span>
                <span className="hero__status">{p.status}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      <a href="#method" className="hero__cue" onClick={(e) => go(e, "#method")} data-magnetic>
        <span className="hero__cue-line" aria-hidden="true" />
        Pull the thread
      </a>
    </section>
  );
}
