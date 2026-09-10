export default function HomePage() {
  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <div className="brandMark">WP</div>
          <span>Winning Products Intelligence</span>
        </div>
        <div className="status"><span className="dot" /> Not connected</div>
      </header>

      <div className="content">
        <section className="hero">
          <div>
            <div className="eyebrow">South Africa · Evidence-first</div>
            <h1>Find opportunities.<br />Know the risk.</h1>
            <p>
              A premium product-intelligence workspace that separates real evidence from hype,
              then translates demand, competition, landed cost, fulfilment and local market fit
              into an explainable opportunity score.
            </p>
          </div>
          <button className="primary" type="button">Connect Shopify store</button>
        </section>

        <section className="grid" aria-label="Opportunity metrics">
          <Metric label="Opportunities" value="—" hint="Connect a store to begin" />
          <Metric label="High conviction" value="—" hint="Evidence-backed only" />
          <Metric label="Watchlist" value="—" hint="Your saved candidates" />
          <Metric label="Margin view" value="ZAR" hint="VAT-aware commercial model" />
        </section>

        <div className="workspace">
          <section className="panel section">
            <div className="sectionHead">
              <div>
                <h2 className="sectionTitle">Opportunity feed</h2>
                <div className="sectionSub">Ranked only after evidence and commercial inputs are available.</div>
              </div>
              <button className="secondary" type="button">Filters</button>
            </div>
            <div className="empty">
              <div className="emptyIcon">01</div>
              <h2>Your intelligence feed is waiting</h2>
              <p>
                We will not manufacture “winning products” or fake market numbers. Once connected,
                the feed will show the evidence, freshness, confidence, landed-cost assumptions and
                score behind every opportunity.
              </p>
              <button className="primary" type="button">Connect Shopify store</button>
            </div>
          </section>

          <aside className="panel section">
            <div className="sectionHead">
              <div>
                <h2 className="sectionTitle">What we score</h2>
                <div className="sectionSub">Designed around the SA merchant reality.</div>
              </div>
            </div>
            <div className="list">
              <ScoreItem title="Demand" detail="Observed demand signals" />
              <ScoreItem title="Momentum" detail="Recent acceleration" />
              <ScoreItem title="Competition" detail="Saturation opportunity" />
              <ScoreItem title="Margin" detail="Landed cost → ZAR profit" />
              <ScoreItem title="Fulfilment" detail="Delivery + shipping friction" />
              <ScoreItem title="SA fit" detail="Local demand + pricing" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Metric({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="panel metric">
      <div className="metricLabel">{label}</div>
      <div className="metricValue">{value}</div>
      <div className="metricHint">{hint}</div>
    </div>
  );
}

function ScoreItem({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="listItem">
      <div>
        <strong>{title}</strong>
        <span>{detail}</span>
      </div>
      <div className="badge">Evidence</div>
    </div>
  );
}
