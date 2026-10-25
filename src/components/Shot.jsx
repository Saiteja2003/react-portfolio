const base = import.meta.env.BASE_URL;

// A real product screenshot in a minimal browser frame.
export default function Shot({ src, w, h, url, alt }) {
  return (
    <figure className="shot">
      <div className="shot__bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <em>{url}</em>
      </div>
      <div className="shot__media">
        <img
          src={`${base}${src}`}
          alt={alt}
          width={w}
          height={h}
          loading="lazy"
          decoding="async"
        />
      </div>
    </figure>
  );
}
