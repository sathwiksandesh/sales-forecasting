# 🛍️ Retail Sales Forecasting Dashboard

An end-to-end Machine Learning application that predicts retail sales using historical business data and provides actionable business recommendations through a modern interactive dashboard.

---

## 🚀 Project Overview

Retail businesses must accurately forecast sales to optimize inventory, pricing strategies, and promotional campaigns.

This project combines:

* Machine Learning Sales Forecasting
* Business Rule Engine
* FastAPI Backend
* Next.js Frontend Dashboard
* Interactive Data Visualization

The system predicts future sales and generates business recommendations such as inventory status, pricing insights, promotion suggestions, and inventory risk levels.

---

## 📊 Features

### Sales Forecasting

Predicts expected sales using a trained LightGBM model.

### Business Recommendations

The recommendation engine provides:

* Inventory Status
* Promotion Recommendation
* Pricing Recommendation
* Inventory Risk Assessment

### Interactive Dashboard

Users can:

* Enter store and product information
* Modify inventory and pricing details
* Generate real-time forecasts
* Visualize feature importance
* View business recommendations instantly

---

## 🏗️ Project Architecture

```text
Frontend (Next.js + React)
            │
            ▼
      FastAPI Backend
            │
            ▼
     Prediction Engine
            │
            ▼
      LightGBM Model
            │
            ▼
     Business Rules Layer
            │
            ▼
 Dashboard Recommendations
```

---

## 🧠 Machine Learning Pipeline

### 1. Exploratory Data Analysis

* Data Understanding
* Missing Value Analysis
* Outlier Detection
* Correlation Analysis

### 2. Feature Engineering

Created engineered features such as:

* Price Difference
* Discount Value
* Effective Price
* Inventory Coverage

### 3. Model Training

Algorithms evaluated:

* Linear Regression
* Random Forest Regressor
* XGBoost
* LightGBM

### Best Model

LightGBM Regressor

Performance Metrics:

| Metric   | Value  |
| -------- | ------ |
| MAE      | 7.14   |
| RMSE     | 8.38   |
| R² Score | 0.9941 |

---

## 🔝 Top Important Features

| Feature            | Importance |
| ------------------ | ---------- |
| Demand Forecast    | 1009       |
| Inventory Coverage | 405        |
| Inventory Level    | 302        |
| Price Difference   | 183        |
| Units Ordered      | 160        |

---

## 🛠️ Tech Stack

### Machine Learning

* Python
* Pandas
* NumPy
* Scikit-Learn
* LightGBM
* Joblib

### Backend

* FastAPI
* Uvicorn
* Pydantic

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Axios
* Recharts

---

## 📁 Project Structure

```text
Retail-Sales-Forecasting/
│
├── backend/
│   ├── app.py
│   ├── predictor.py
│   ├── business_rules.py
│   ├── schemas.py
│
├── frontend/
│   ├── app/
│   ├── components/
│
├── model/
│   ├── lightgbm_sales_model.pkl
│   ├── label_encoders.pkl
│
├── notebooks/
│   ├── 01_EDA.ipynb
│   ├── 02_Preprocessing_Feature_Engineering.ipynb
│   ├── 03_Model_Training.ipynb
│   ├── 04_Model_Optimization_Explainability.ipynb
│   ├── 05_Business_Rules.ipynb
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/sathwiksandesh/sales-forecasting.git
cd sales-forecasting
```

### Backend Setup

```bash
pip install -r requirements.txt

cd backend

python -m uvicorn app:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

Swagger API Docs:

```text
http://127.0.0.1:8000/docs
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

## 📡 API Endpoint

### Predict Sales

```http
POST /predict
```

Example Request:

```json
{
  "store_id": "S001",
  "product_id": "P0001",
  "category": "Groceries",
  "region": "North",
  "inventory_level": 231,
  "units_ordered": 55,
  "demand_forecast": 135.47,
  "price": 33.5,
  "discount": 20,
  "weather_condition": "Rainy",
  "holiday_promotion": 0,
  "competitor_pricing": 29.69,
  "seasonality": "Autumn",
  "year": 2022,
  "quarter": 1,
  "month": 1,
  "week_of_year": 1,
  "day_of_week": 5
}
```

Example Response:

```json
{
  "predicted_sales": 131.17,
  "inventory_status": "Inventory Sufficient",
  "promotion_recommendation": "Run Promotion",
  "pricing_recommendation": "Price Above Competitor",
  "inventory_risk": "Low Risk"
}
```

---

## 📈 Future Improvements

* User Authentication
* Sales Trend Forecast Visualization
* Model Monitoring Dashboard
* Cloud Deployment
* Prediction History Storage
* Automated Retraining Pipeline


---

## 👨‍💻 Author

Siddhantam Sathwik Sandesh

Artificial Intelligence & Data Science Student

Passionate about Machine Learning, Data Science, and Full-Stack AI Applications.
