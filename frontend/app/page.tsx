"use client";

import { useState, createContext, useContext } from "react";
import InputForm from "../components/InputForm";
import PredictionCards from "../components/PredictionCards";
import InsightsPanel from "../components/InsightsPanel";
import FeatureImportanceChart from "../components/FeatureImportanceChart";

// ─── Theme Context ─────────────────────────────────────────────────────────
export const ThemeCtx = createContext<{ isDark: boolean }>({ isDark: true });
export function useTheme() { return useContext(ThemeCtx); }

const DARK = `
  --bg-base:        #0d1117;
  --bg-surface:     #161b22;
  --bg-raised:      #1c2330;
  --border:         #2a3444;
  --border-subtle:  #1e2a38;
  --text-primary:   #e6edf3;
  --text-secondary: #8b9ab0;
  --text-muted:     #4a5568;
  --scrollbar:      #2a3444;
`;

const LIGHT = `
  --bg-base:        #f0f4f8;
  --bg-surface:     #ffffff;
  --bg-raised:      #f8fafc;
  --border:         #e2e8f0;
  --border-subtle:  #eef2f7;
  --text-primary:   #0f172a;
  --text-secondary: #475569;
  --text-muted:     #94a3b8;
  --scrollbar:      #cbd5e1;
`;

const SHARED = `
  --accent:      #00c9a7;
  --accent-dim:  #00c9a718;
  --accent2:     #3b82f6;
  --accent2-dim: #3b82f618;
  --red:         #f85149;
  --yellow:      #d97706;
  --green:       #16a34a;
  --purple:      #7c3aed;
  --font-sans:   'Inter', system-ui, sans-serif;
  --font-serif:  'Playfair Display', Georgia, serif;
  --font-mono:   'JetBrains Mono', 'Fira Code', monospace;
`;

export default function Home() {
  const [result, setResult] = useState(null);
  const [isDark, setIsDark] = useState(true);

  return (
    <ThemeCtx.Provider value={{ isDark }}>
      <main className={`main-shell ${isDark ? "theme-dark" : "theme-light"}`} style={{
        background: "var(--bg-base)",
        fontFamily: "var(--font-sans)",
        transition: "background 0.3s, color 0.3s",
      }}>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

          :root       { ${SHARED} }
          .theme-dark { ${DARK}   }
          .theme-light{ ${LIGHT}  }

          *, *::before, *::after { box-sizing: border-box; }

          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: var(--bg-base); }
          ::-webkit-scrollbar-thumb { background: var(--scrollbar); border-radius: 3px; }

          /* ── Inputs ── */
          .ds-input {
            background: var(--bg-base);
            border: 1px solid var(--border);
            color: var(--text-primary);
            border-radius: 8px;
            padding: 10px 14px;
            font-size: 14px;
            font-family: var(--font-sans);
            width: 100%;
            transition: border-color 0.15s, box-shadow 0.15s, background 0.3s, color 0.3s;
            outline: none;
          }
          .ds-input:focus {
            border-color: var(--accent);
            box-shadow: 0 0 0 3px var(--accent-dim);
          }
          .ds-input option { background: var(--bg-surface); color: var(--text-primary); }

          /* ── Section label ── */
          .section-label {
            font-family: var(--font-sans);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--text-muted);
            margin-bottom: 14px;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .section-label::after {
            content: ''; flex: 1; height: 1px; background: var(--border-subtle);
          }

          /* ── Field label ── */
          .field-label {
            font-family: var(--font-sans);
            font-size: 12px;
            font-weight: 600;
            color: var(--text-secondary);
            margin-bottom: 6px;
            letter-spacing: 0.01em;
          }

          /* ── Cards ── */
          .ds-card {
            background: var(--bg-surface);
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 24px;
            transition: background 0.3s, border-color 0.3s;
          }

          .stat-card {
            background: var(--bg-surface);
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 22px 24px;
            position: relative;
            overflow: hidden;
            transition: border-color 0.2s, transform 0.2s, background 0.3s;
          }
          .stat-card:hover { transform: translateY(-2px); border-color: var(--accent); }

          /* ── Button ── */
          .ds-btn {
            background: var(--accent);
            color: #0d1117;
            font-weight: 700;
            font-size: 14px;
            padding: 11px 32px;
            border-radius: 9px;
            border: none;
            cursor: pointer;
            font-family: var(--font-sans);
            letter-spacing: 0.03em;
            transition: opacity 0.15s, transform 0.1s;
          }
          .ds-btn:hover { opacity: 0.88; transform: translateY(-1px); }
          .ds-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

          /* ── Mono (numbers/data only) ── */
          .mono { font-family: var(--font-mono); }

          /* ── Serif (headings) ── */
          .serif { font-family: var(--font-serif); }

          /* ── Animations ── */
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .fade-up   { animation: fadeUp 0.45s ease both; }
          .fade-up-2 { animation: fadeUp 0.45s 0.1s ease both; }
          .fade-up-3 { animation: fadeUp 0.45s 0.2s ease both; }

          /* ── Theme toggle ── */
          .theme-toggle {
            display: flex;
            align-items: center;
            background: var(--bg-raised);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 3px;
          }
          .toggle-opt {
            display: flex; align-items: center; gap: 6px;
            padding: 7px 16px; border-radius: 7px;
            font-size: 13px; font-weight: 600;
            font-family: var(--font-sans);
            transition: background 0.2s, color 0.2s;
            user-select: none; cursor: pointer;
            color: var(--text-muted);
          }
          .toggle-opt.active {
            background: var(--bg-surface);
            color: var(--text-primary);
            box-shadow: 0 1px 4px rgba(0,0,0,0.18);
          }

          /* ── Responsive layout ── */
          .main-shell {
            min-height: 100vh;
            padding: 28px 44px;
          }
          .page-container {
            max-width: 1300px;
            margin: 0 auto;
          }
          .page-header {
            margin-bottom: 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
          }
          .header-right {
            display: flex;
            align-items: center;
            gap: 24px;
          }
          .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 12px;
          }
          .main-grid {
            display: grid;
            grid-template-columns: 1fr 360px;
            gap: 16px;
            margin-top: 16px;
          }
          .chart-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 32px;
            align-items: center;
          }
          .responsive-grid {
            display: grid;
            gap: 14px;
          }
          .grid-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .grid-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }

          @media (max-width: 960px) {
            .main-shell { padding: 24px 20px; }
            .page-header { flex-direction: column; align-items: flex-start; }
            .page-header .header-right { width: 100%; justify-content: space-between; }
            .main-grid { grid-template-columns: 1fr; }
            .chart-grid { grid-template-columns: 1fr; }
          }

          @media (max-width: 720px) {
            .main-shell { padding: 18px 14px; }
            .section-label { font-size: 10px; margin-bottom: 12px; }
            .ds-card { padding: 20px; }
            .ds-btn { width: 100%; padding: 12px 18px; }
            .grid-4, .grid-3, .grid-5 { grid-template-columns: 1fr; }
            .cards-grid { grid-template-columns: 1fr; }
            .chart-grid { gap: 20px; }
          }

          @media (max-width: 520px) {
            .main-shell { padding: 14px 12px; }
            .page-header { gap: 16px; }
            .theme-toggle { width: 100%; justify-content: center; }
          }
        `}</style>

        <div className="page-container" style={{ maxWidth: 1300, margin: "0 auto" }}>

          {/* ── Header ── */}
          <header className="fade-up page-header" style={{
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "var(--accent)", boxShadow: "0 0 10px var(--accent)",
                }} />
                <span style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11, fontWeight: 700,
                  color: "var(--accent)", letterSpacing: "0.14em", textTransform: "uppercase",
                }}>Live Dashboard</span>
              </div>
              <h1 className="serif" style={{
                fontSize: 34,
                fontWeight: 700,
                color: "var(--text-primary)",
                margin: 0,
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}>
                Retail Sales Forecasting
              </h1>
            </div>

            <div className="header-right">
              <div className="theme-toggle">
                <div className={`toggle-opt${isDark ? " active" : ""}`} onClick={() => setIsDark(true)}>
                  <span>🌙</span> Dark
                </div>
                <div className={`toggle-opt${!isDark ? " active" : ""}`} onClick={() => setIsDark(false)}>
                  <span>☀️</span> Light
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>
                
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>
                  
                </div>
              </div>
            </div>
          </header>

          {/* ── Stat Cards ── */}
          <div className="fade-up-2">
            <PredictionCards result={result} />
          </div>

          {/* ── Form + Insights ── */}
          <div className="fade-up-3 main-grid">
            <InputForm setResult={setResult} />
            <InsightsPanel result={result} />
          </div>

          {/* ── Chart ── */}
          <div style={{ marginTop: 16, paddingBottom: 40 }}>
            <FeatureImportanceChart />
          </div>

        </div>
      </main>
    </ThemeCtx.Provider>
  );
}