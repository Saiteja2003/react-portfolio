import { useEffect, useState } from "react";
import { buildChain, verifyChain } from "../../lib/mechanisms";

// Sample events. Amounts are integer cents, as in the finance rules.
const SEED = [
  { id: "e1", type: "lot.registered", payload: { lot: "TUR-0412", kg: 1000 } },
  { id: "e2", type: "sample.dispatched", payload: { lot: "TUR-0412", grams: 100 } },
  { id: "e3", type: "invoice.issued", payload: { lot: "TUR-0412", amount_cents: 640000 } },
  { id: "e4", type: "payment.received", payload: { invoice: "e3", amount_cents: 256000 } },
  { id: "e5", type: "shipment.booked", payload: { lot: "TUR-0412", container: "20ft" } },
];

const short = (h) => `${h.slice(0, 6)}…${h.slice(-4)}`;
const euros = (c) => (c / 100).toLocaleString("en-GB", { style: "currency", currency: "EUR" });

export default function SolumDemo() {
  const supported = typeof crypto !== "undefined" && !!crypto.subtle;
  const [rows, setRows] = useState(null);
  const [broken, setBroken] = useState(-1);
  const [tampered, setTampered] = useState(false);

  useEffect(() => {
    if (!supported) return;
    buildChain(SEED).then(setRows);
  }, [supported]);

  useEffect(() => {
    if (!rows) return;
    let live = true;
    verifyChain(rows).then((i) => live && setBroken(i));
    return () => {
      live = false;
    };
  }, [rows]);

  // Rewrites the stored invoice amount without going through the trigger,
  // the way someone with direct table access might try to.
  const tamper = () => {
    setRows((r) =>
      r.map((row) =>
        row.id === "e3" ? { ...row, payload: { ...row.payload, amount_cents: row.payload.amount_cents + 100000 } } : row,
      ),
    );
    setTampered(true);
  };
  const restore = () => {
    buildChain(SEED).then(setRows);
    setTampered(false);
  };

  if (!supported) {
    return (
      <div className="demo" data-demo>
        <p className="demo__hint">This demo needs the Web Crypto API, which your browser doesn't expose here.</p>
      </div>
    );
  }

  return (
    <div className="demo" data-demo>
      <div className="demo__bar">
        <span className="demo__title">Audit trail</span>
        <span className="demo__src">app.event_hash() · SHA-256</span>
      </div>
      <div className="demo__body">
        <ol className="chain">
          {(rows ?? []).map((r, i) => {
            const bad = broken !== -1 && i >= broken;
            return (
              <li key={r.id} className={`block ${bad ? "is-bad" : ""} ${broken === i ? "is-origin" : ""}`}>
                <div className="block__head">
                  <span className="mono-label">#{i + 1}</span>
                  <span className="block__type">{r.type}</span>
                  <span className="block__state">{bad ? (broken === i ? "hash mismatch" : "untrusted") : "verified"}</span>
                </div>
                <div className="block__payload">
                  {Object.entries(r.payload).map(([k, v]) => (
                    <span key={k}>
                      {k}: <b>{k.endsWith("_cents") ? euros(v) : String(v)}</b>
                    </span>
                  ))}
                </div>
                <div className="block__hash">
                  <span title={r.prevHash}>prev {short(r.prevHash)}</span>
                  <span title={r.hash}>hash {short(r.hash)}</span>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="chips">
          {!tampered ? (
            <button className="chip chip--fail" onClick={tamper} disabled={!rows}>
              Edit invoice #3 directly
            </button>
          ) : (
            <button className="chip" onClick={restore}>
              Restore from backup
            </button>
          )}
        </div>
        <p className={`verdict ${broken === -1 ? "verdict--pass" : "verdict--fail"}`} aria-live="polite">
          <span className="mono-label">Verification</span>
          {rows === null
            ? "Hashing…"
            : broken === -1
              ? `Chain intact: ${rows.length} events, each hash covers the one before it.`
              : `Event #${broken + 1} no longer matches its hash, so it and everything after it can't be trusted. In the real database the edit is refused outright: events are append-only.`}
        </p>
      </div>
      <p className="demo__note">Hashes are computed in your browser. Sample data; simplified serialization.</p>
    </div>
  );
}
