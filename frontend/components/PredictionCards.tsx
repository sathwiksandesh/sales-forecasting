type PredictionProps = { result: any };

const cards = [
  { key: "predicted_sales",          label: "Predicted Sales", icon: "▲", accentColor: "var(--accent)",  accentDim: "var(--accent-dim)",  big: true },
  { key: "inventory_status",         label: "Inventory",       icon: "◈", accentColor: "var(--green)",   accentDim: "#16a34a18" },
  { key: "promotion_recommendation", label: "Promotion",       icon: "◆", accentColor: "var(--yellow)",  accentDim: "#d9770618" },
  { key: "pricing_recommendation",   label: "Pricing",         icon: "◉", accentColor: "var(--accent2)", accentDim: "var(--accent2-dim)" },
  { key: "inventory_risk",           label: "Risk Level",      icon: "⚠", accentColor: "var(--red)",     accentDim: "#f8514918" },
];

export default function PredictionCards({ result }: PredictionProps) {
  return (
    <div className="cards-grid">
      {cards.map(({ key, label, icon, accentColor, accentDim, big }) => {
        const value = result?.[key] ?? null;
        return (
          <div key={key} className="stat-card">
            {/* top accent bar */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 3,
              background: accentColor, opacity: value ? 1 : 0.2,
            }} />

            {/* header row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11, fontWeight: 700,
                letterSpacing: "0.09em", textTransform: "uppercase",
                color: "var(--text-muted)",
              }}>
                {label}
              </span>
              <span style={{
                width: 28, height: 28, borderRadius: 7,
                background: value ? accentDim : "var(--bg-raised)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, color: value ? accentColor : "var(--text-muted)",
              }}>
                {icon}
              </span>
            </div>

            {/* value */}
            <div className="mono" style={{
              fontSize: big ? 32 : 15,
              fontWeight: big ? 600 : 500,
              color: value ? (big ? accentColor : "var(--text-primary)") : "var(--text-muted)",
              lineHeight: 1.25,
              minHeight: big ? 40 : 44,
              display: "flex", alignItems: "center",
            }}>
              {value ?? "—"}
            </div>

            {/* status */}
            <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: value ? accentColor : "var(--text-muted)",
                opacity: value ? 1 : 0.35,
                boxShadow: value ? `0 0 6px ${accentColor}` : "none",
              }} />
              <span style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11, color: "var(--text-muted)", fontWeight: 500,
              }}>
                {value ? "updated" : "awaiting forecast"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}