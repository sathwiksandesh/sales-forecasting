from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import SalesInput

from predictor import predict_sales

from business_rules import (
    inventory_status,
    promotion_recommendation,
    pricing_recommendation,
    inventory_risk
)

app = FastAPI(
    title="Retail Sales Forecasting API"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():

    return {
        "message": "Retail Sales Forecasting API Running"
    }


@app.post("/predict")
def predict(data: SalesInput):

    predicted_sales = predict_sales(data)

    inventory_result = inventory_status(
        data.inventory_level,
        predicted_sales
    )

    promotion_result = promotion_recommendation(
        predicted_sales,
        data.demand_forecast
    )

    pricing_result = pricing_recommendation(
        data.price,
        data.competitor_pricing
    )

    risk_result = inventory_risk(
        data.inventory_level,
        predicted_sales
    )

    return {

        "predicted_sales": predicted_sales,

        "inventory_status": inventory_result,

        "promotion_recommendation": promotion_result,

        "pricing_recommendation": pricing_result,

        "inventory_risk": risk_result
    }
@app.get("/metadata")
def metadata():

    return {

        "store_ids": [
            "S001",
            "S002",
            "S003",
            "S004",
            "S005"
        ],

        "categories": [
            "Groceries",
            "Electronics",
            "Clothing",
            "Furniture",
            "Toys"
        ],

        "regions": [
            "North",
            "South",
            "East",
            "West"
        ],

        "weather": [
            "Sunny",
            "Cloudy",
            "Rainy"
        ],

        "seasonality": [
            "Spring",
            "Summer",
            "Autumn",
            "Winter"
        ]
    }