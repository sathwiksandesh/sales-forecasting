"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useTheme } from "../app/page";

const data = [
  { feature: "Demand Forecast",    importance: 1009 },
  { feature: "Inventory Coverage", importance: 405  },
  { feature: "Inventory Level",    importance: 302  },
  { feature: "Price Difference",   importance: 183  },
  { feature: "Units Ordered",      importance: 160  },
];

const COLORS = ["#00c9a7","#3b82f6","#a371f7","#d97706","#f85149"];

const CustomTooltip = ({ active, payload, label, isDark }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: isDark ? "#1c2330" : "#ffffff",
      border: `1px solid ${isDark ? "#2a3444" : "#e2e8f0"}`,
      borderRadius: 10, padding: "12px 16px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
    }}>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: isDark ? "#8b9ab0" : "#475569", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 600, color: "#00c9a7" }}>
        {payload[0].value.toLocaleString()}
      </div>
    </div>
  );
};

export default function FeatureImportanceChart() {
  const { isDark } = useTheme();
  const max = Math.max(...data.map(d => d.importance));

  const tickColor  = isDark ? "#4a5568" : "#94a3b8";
  const textSecond = isDark ? "#8b9ab0" : "#475569";
  const bgRaised   = isDark ? "#1c2330" : "#f1f5f9";
  const axisLine   = isDark ? "#2a3444" : "#e2e8f0";

  return (
    <div className="ds-card">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div className="section-label" style={{ marginBottom: 6 }}>Model Explainability</div>
          <h2 className="serif" style={{
            fontSize: 22, fontWeight: 700,
            color: "var(--text-primary)", margin: 0,
          }}>
            Feature Importance
          </h2>
        </div>
        <span style={{
          fontFamily: "var(--font-sans)",
          fontSize: 11, fontWeight: 700,
          padding: "5px 12px", borderRadius: 20,
          background: "var(--accent-dim)", color: "var(--accent)",
          letterSpacing: "0.08em", textTransform: "uppercase",
        }}>
          LIGHT GBM
        </span>
      </div>

      <div className="chart-grid" style={{ alignItems: "center" }}>

        {/* Chart */}
        <div style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 0, right: 28, top: 0, bottom: 0 }}>
              <XAxis
                type="number"
                tick={{ fill: tickColor, fontSize: 11, fontFamily: "var(--font-mono)" }}
                axisLine={{ stroke: axisLine }}
                tickLine={false}
              />
              <YAxis
                dataKey="feature" type="category"
                tick={{ fill: textSecond, fontSize: 12, fontFamily: "var(--font-sans)" }}
                axisLine={false} tickLine={false} width={150}
              />
              <Tooltip content={(p: any) => <CustomTooltip {...p} isDark={isDark} />}
                cursor={{ fill: isDark ? "#1c233080" : "#f1f5f980" }} />
              <Bar dataKey="importance" radius={[0, 5, 5, 0]} maxBarSize={22}>
                {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Progress legend */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {data.map(({ feature, importance }, i) => (
            <div key={feature} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: COLORS[i], flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500, color: "var(--text-secondary)" }}>
                    {feature}
                  </span>
                  <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: COLORS[i] }}>
                    {importance}
                  </span>
                </div>
                <div style={{ height: 4, background: bgRaised, borderRadius: 3 }}>
                  <div style={{
                    height: "100%",
                    width: `${(importance / max) * 100}%`,
                    background: COLORS[i], borderRadius: 3,
                    transition: "width 0.7s ease",
                  }} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}