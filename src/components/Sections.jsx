import { archive, certifications, path, person, principles, projects, toolkit } from "../data/content";

const base = import.meta.env.BASE_URL;
const projectName = Object.fromEntries(projects.map((p) => [p.id, p.name]));

export function Method() {
  return (
    <section id="method" className="method" aria-labelledby="method-title">
      <div className="section-head" data-reveal>
        <p className="mono-label">The through-line</p>
        <h2 id="method-title" data-anchor>
          Three rules my projects <em>keep</em> arriving at.
        </h2>
      </div>
      <ol className="principles">
        {principles.map((r, i) => (
          <li key={r.id} className="principle" data-reveal style={{ "--d": `${i * 90}ms` }}>
            <span className="principle__n">0{i + 1}</span>
            <h3>{r.title}</h3>
            <p>{r.body}</p>
            <pre>
              <code>{r.code}</code>
            </pre>
            <p className="principle__src mono-label">{r.src}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function WorkIntro() {
  return (
    <div className="section-head section-head--work" data-reveal>
      <p className="mono-label">Selected work · 2025 – 2026</p>
      <h2 id="work-title" data-anchor>
        Four systems. Each one <em>runs</em> below.
      </h2>
      <p className="section-head__sub">
        Every demo on this page executes a browser port of the project’s real logic, so you can try to break it yourself.
      </p>
    </div>
  );
}

export function Archive() {
  return (
    <section id="archive" className="archive" aria-labelledby="archive-title">
      <div className="section-head" data-reveal>
        <p className="mono-label">Earlier threads</p>
        <h2 id="archive-title" data-anchor>
          Where it started.
        </h2>
      </div>
      <ul className="archive__list">
        {archive.map((a) => (
          <li key={a.name} className="archive__item" data-reveal>
            <span className="archive__year mono-label">{a.year}</span>
            <div className="archive__body">
              <h3>{a.name}</h3>
              <p>{a.what}</p>
              <p className="mono-label">{a.stack}</p>
            </div>
            <div className="archive__links">
              {a.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-arrow" data-magnetic>
                  {l.label}
                  <span aria-hidden="true"> ↗</span>
                </a>
              ))}
            </div>
            {a.image && (
              <img
                className="archive__peek"
                src={`${base}${a.image}`}
                alt=""
                width="1898"
                height="858"
                loading="lazy"
                decoding="async"
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Path() {
  return (
    <section id="path" className="path" aria-labelledby="path-title">
      <div className="section-head" data-reveal>
        <p className="mono-label">Path</p>
        <h2 id="path-title" data-anchor>
          From Gudlavalleru to <em>Koblenz</em>.
        </h2>
      </div>
      <ol className="path__list">
        {path.map((s) => (
          <li key={s.what} className="path__item" data-reveal>
            <span className="path__when mono-label">{s.when}</span>
            <div>
              <h3>{s.what}</h3>
              <p className="path__where">{s.where}</p>
              {s.note && <p className="path__note">{s.note}</p>}
            </div>
          </li>
        ))}
      </ol>
      <div className="certs" data-reveal>
        <p className="mono-label">Certifications</p>
        <ul>
          {certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Toolkit({ go }) {
  return (
    <section id="toolkit" className="toolkit" aria-labelledby="toolkit-title">
      <div className="section-head" data-reveal>
        <p className="mono-label">Toolkit</p>
        <h2 id="toolkit-title" data-anchor>
          Skills, with <em>receipts</em>.
        </h2>
        <p className="section-head__sub">No self-rated bars. Each tool links to the work above that uses it.</p>
      </div>
      <div className="toolkit__grid">
        {toolkit.map((g) => (
          <div key={g.group} className="toolkit__group" data-reveal>
            <h3 className="mono-label">{g.group}</h3>
            <ul>
              {g.items.map(([tool, used]) => (
                <li key={tool}>
                  <span className="toolkit__tool">{tool}</span>
                  <span className="toolkit__used">
                    {used.length === 0 ? (
                      <span className="toolkit__none">earlier work and study</span>
                    ) : (
                      used.map((id) => (
                        <a key={id} href={`#${id}`} onClick={(e) => go(e, `#${id}`)}>
                          {projectName[id]}
                        </a>
                      ))
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <footer id="contact" className="contact" aria-labelledby="contact-title">
      <p className="mono-label" data-reveal>
        End of the thread
      </p>
      <h2 id="contact-title" className="contact__title" data-reveal data-anchor>
        Let’s build something <em>you can check</em>.
      </h2>
      <a className="contact__mail" href={`mailto:${person.email}`} data-reveal data-magnetic>
        {person.email}
      </a>
      <ul className="contact__links" data-reveal>
        <li>
          <a href={person.github} target="_blank" rel="noopener noreferrer" className="link-arrow" data-magnetic>
            GitHub<span aria-hidden="true"> ↗</span>
          </a>
        </li>
        <li>
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="link-arrow" data-magnetic>
            LinkedIn<span aria-hidden="true"> ↗</span>
          </a>
        </li>
        <li className="contact__where">{person.location}</li>
      </ul>
      <p className="contact__fine">
        © {new Date().getFullYear()} {person.name}. Built with React and Vite; the thread is a 22-point verlet rope on a single canvas.
      </p>
    </footer>
  );
}
