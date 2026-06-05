type Props = { result: any };

const items = [
  { key: "predicted_sales",          label: "Predicted Sales", icon: "▲", color: "var(--accent)"  },
  { key: "inventory_status",         label: "Inventory",       icon: "◈", color: "var(--green)"   },
  { key: "promotion_recommendation", label: "Promotion",       icon: "◆", color: "var(--yellow)"  },
  { key: "pricing_recommendation",   label: "Pricing",         icon: "◉", color: "var(--accent2)" },
  { key: "inventory_risk",           label: "Risk",            icon: "▲", color: "var(--red)"     },
];

export default function InsightsPanel({ result }: Props) {
  return (
    <div className="ds-card" style={{ display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div className="section-label" style={{ marginBottom: 6 }}>AI Analysis</div>
        <h2 className="serif" style={{
          fontSize: 22, fontWeight: 700,
          color: "var(--text-primary)", margin: 0, lineHeight: 1.2,
        }}>
          Forecast Insights
        </h2>
      </div>

      {!result ? (
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 14, padding: "48px 0", color: "var(--text-muted)", textAlign: "center",
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            border: "1px dashed var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, color: "var(--text-muted)",
          }}>◎</div>
          <div style={{
            fontFamily: "var(--font-sans)",
            fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7,
          }}>
            Run a forecast to see<br />AI-generated insights
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {items.map(({ key, label, icon, color }) => (
            <div key={key} style={{
              display: "flex", alignItems: "flex-start",
              justifyContent: "space-between", gap: 12,
              padding: "15px 0",
              borderBottom: "1px solid var(--border-subtle)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 10, color }}>{icon}</span>
                <span style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13, fontWeight: 600,
                  color: "var(--text-secondary)",
                }}>
                  {label}
                </span>
              </div>
              <span className="mono" style={{
                fontSize: 13, fontWeight: 500,
                color: "var(--text-primary)",
                textAlign: "right", maxWidth: 170, lineHeight: 1.5,
              }}>
                {result[key] ?? "—"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}