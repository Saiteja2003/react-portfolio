import Shot from "../Shot";

// The shipped product as it is: a real screenshot, plus the job that keeps its feeds alive.
export default function NexusShowcase({ image }) {
  return (
    <div className="demo demo--bare" data-demo>
      <Shot
        src={image}
        w={1912}
        h={864}
        url="nexusreader.org"
        alt="NexusReader showing a sidebar of feeds, a list of MIT Technology Review articles and the selected article open on the right."
      />
      <div className="log" aria-label="Feed health job">
        <p className="mono-label">daily-feed-update.yml · cron 0 0 * * *</p>
        <code>HEAD each curated feed · timeout 5s · purge on failure</code>
        <code>Engine Run: 2026-09-11T02:05:00.707Z | Active Feeds: 12 | Purged: 0</code>
      </div>
    </div>
  );
}
