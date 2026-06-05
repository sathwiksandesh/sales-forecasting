"use client";

import { useState } from "react";
import axios from "axios";

const CATEGORIES = ["Groceries","Electronics","Clothing","Furniture","Sports","Toys","Beauty","Automotive"];
const REGIONS    = ["North","South","East","West","Central"];
const WEATHER    = ["Sunny","Rainy","Cloudy","Snowy","Windy","Stormy"];
const SEASONS    = ["Spring","Summer","Autumn","Winter"];
const MONTHS     = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS       = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="field-label">{label}</div>
      {children}
    </div>
  );
}

export default function InputForm({ setResult }: { setResult: any }) {
  const [formData, setFormData] = useState({
    store_id: "S001", product_id: "P0001", category: "Groceries", region: "North",
    inventory_level: 231, units_ordered: 55, demand_forecast: 135.47,
    price: 33.5, discount: 20, weather_condition: "Rainy",
    holiday_promotion: 0, competitor_pricing: 29.69, seasonality: "Autumn",
    year: 2022, quarter: 1, month: 1, week_of_year: 1, day_of_week: 5,
  });
  const [loading, setLoading] = useState(false);

  const set = (key: string, value: any) => setFormData(p => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://sales-forecasting-80yo.onrender.com/predict", formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ds-card" style={{ display: "flex", flexDirection: "column", gap: 28 }}>

      {/* Store Info */}
      <div>
        <div className="section-label">Store Info</div>
        <div className="responsive-grid grid-4">
          <Field label="Store ID">
            <input className="ds-input" value={formData.store_id} onChange={e => set("store_id", e.target.value)} />
          </Field>
          <Field label="Product ID">
            <input className="ds-input" value={formData.product_id} onChange={e => set("product_id", e.target.value)} />
          </Field>
          <Field label="Category">
            <select className="ds-input" value={formData.category} onChange={e => set("category", e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Region">
            <select className="ds-input" value={formData.region} onChange={e => set("region", e.target.value)}>
              {REGIONS.map(r => <option key={r}>{r}</option>)}
            </select>
          </Field>
        </div>
      </div>

      {/* Inventory */}
      <div>
        <div className="section-label">Inventory</div>
        <div className="responsive-grid grid-3">
          <Field label="Inventory Level">
            <input type="number" className="ds-input" value={formData.inventory_level} onChange={e => set("inventory_level", Number(e.target.value))} />
          </Field>
          <Field label="Units Ordered">
            <input type="number" className="ds-input" value={formData.units_ordered} onChange={e => set("units_ordered", Number(e.target.value))} />
          </Field>
          <Field label="Demand Forecast">
            <input type="number" className="ds-input" value={formData.demand_forecast} onChange={e => set("demand_forecast", Number(e.target.value))} />
          </Field>
        </div>
      </div>

      {/* Pricing */}
      <div>
        <div className="section-label">Pricing</div>
        <div className="responsive-grid grid-3">
          <Field label="Price ($)">
            <input type="number" className="ds-input" value={formData.price} onChange={e => set("price", Number(e.target.value))} />
          </Field>
          <Field label="Discount (%)">
            <input type="number" className="ds-input" value={formData.discount} onChange={e => set("discount", Number(e.target.value))} />
          </Field>
          <Field label="Competitor Price ($)">
            <input type="number" className="ds-input" value={formData.competitor_pricing} onChange={e => set("competitor_pricing", Number(e.target.value))} />
          </Field>
        </div>
      </div>

      {/* Environment */}
      <div>
        <div className="section-label">Environment</div>
        <div className="responsive-grid grid-3">
          <Field label="Weather">
            <select className="ds-input" value={formData.weather_condition} onChange={e => set("weather_condition", e.target.value)}>
              {WEATHER.map(w => <option key={w}>{w}</option>)}
            </select>
          </Field>
          <Field label="Seasonality">
            <select className="ds-input" value={formData.seasonality} onChange={e => set("seasonality", e.target.value)}>
              {SEASONS.map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Holiday Promotion">
            <select className="ds-input" value={formData.holiday_promotion} onChange={e => set("holiday_promotion", Number(e.target.value))}>
              <option value={0}>No Promotion</option>
              <option value={1}>Active Promotion</option>
            </select>
          </Field>
        </div>
      </div>

      {/* Time Period */}
      <div>
        <div className="section-label">Time Period</div>
        <div className="responsive-grid grid-5">
          <Field label="Year">
            <input type="number" className="ds-input" value={formData.year} onChange={e => set("year", Number(e.target.value))} />
          </Field>
          <Field label="Quarter">
            <select className="ds-input" value={formData.quarter} onChange={e => set("quarter", Number(e.target.value))}>
              {[1,2,3,4].map(q => <option key={q} value={q}>Q{q}</option>)}
            </select>
          </Field>
          <Field label="Month">
            <select className="ds-input" value={formData.month} onChange={e => set("month", Number(e.target.value))}>
              {MONTHS.map((m,i) => <option key={m} value={i+1}>{m}</option>)}
            </select>
          </Field>
          <Field label="Week of Year">
            <input type="number" min={1} max={53} className="ds-input" value={formData.week_of_year} onChange={e => set("week_of_year", Number(e.target.value))} />
          </Field>
          <Field label="Day of Week">
            <select className="ds-input" value={formData.day_of_week} onChange={e => set("day_of_week", Number(e.target.value))}>
              {DAYS.map((d,i) => <option key={d} value={i+1}>{d}</option>)}
            </select>
          </Field>
        </div>
      </div>

      <div>
        <button type="submit" className="ds-btn" disabled={loading}>
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                style={{ animation: "spin 0.8s linear infinite" }}>
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"
                  strokeDasharray="31.4" strokeDashoffset="10" />
              </svg>
              Running Forecast…
            </span>
          ) : "Run Forecast →"}
        </button>
      </div>

    </form>
  );
}