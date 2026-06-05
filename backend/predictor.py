import joblib
import pandas as pd
from fastapi import HTTPException

# Load model and encoders once when API starts
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

model = joblib.load(
    BASE_DIR / "model" / "lightgbm_sales_model.pkl"
)

encoders = joblib.load(
    BASE_DIR / "model" / "label_encoders.pkl"
)


def predict_sales(data):

    # Convert request to dictionary

    input_data = {

        "Store ID": data.store_id,
        "Product ID": data.product_id,
        "Category": data.category,
        "Region": data.region,

        "Inventory Level": data.inventory_level,
        "Units Ordered": data.units_ordered,
        "Demand Forecast": data.demand_forecast,

        "Price": data.price,
        "Discount": data.discount,

        "Weather Condition": data.weather_condition,

        "Holiday/Promotion": data.holiday_promotion,

        "Competitor Pricing": data.competitor_pricing,

        "Seasonality": data.seasonality,

        "Year": data.year,
        "Quarter": data.quarter,
        "Month": data.month,
        "WeekOfYear": data.week_of_year,
        "DayOfWeek": data.day_of_week
    }

    df = pd.DataFrame([input_data])

    # Encode categorical columns

    categorical_cols = [
        "Store ID",
        "Product ID",
        "Category",
        "Region",
        "Weather Condition",
        "Seasonality"
    ]
    for col in categorical_cols:

        value = df[col].iloc[0]

        if value not in encoders[col].classes_:

            raise HTTPException(
                status_code=400,
                detail=f"Unknown {col}: {value}"
            )

        df[col] = encoders[col].transform(
            df[col]
        )
    # Feature Engineering

    df["Price_Difference"] = (
        df["Price"] -
        df["Competitor Pricing"]
    )

    df["Discount_Value"] = (
        df["Price"] *
        df["Discount"] / 100
    )

    df["Effective_Price"] = (
        df["Price"] -
        df["Discount_Value"]
    )

    df["Inventory_Coverage"] = (
        df["Inventory Level"] /
        (df["Demand Forecast"] + 1)
    )

    # Rename columns to match training

    df.rename(columns={

        "Store ID": "Store_ID",
        "Product ID": "Product_ID",

        "Inventory Level": "Inventory_Level",
        "Units Ordered": "Units_Ordered",

        "Demand Forecast": "Demand_Forecast",

        "Weather Condition": "Weather_Condition",

        "Competitor Pricing": "Competitor_Pricing",

        "WeekOfYear": "WeekOfYear",
        "DayOfWeek": "DayOfWeek"

    }, inplace=True)

    # Reorder columns exactly as model expects

    df = df[model.feature_name_]

    prediction = model.predict(df)[0]

    return round(float(prediction), 2)