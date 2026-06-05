from pydantic import BaseModel


class SalesInput(BaseModel):

    store_id: str
    product_id: str
    category: str
    region: str

    inventory_level: int
    units_ordered: int
    demand_forecast: float

    price: float
    discount: float

    weather_condition: str

    holiday_promotion: int

    competitor_pricing: float

    seasonality: str

    year: int
    quarter: int
    month: int
    week_of_year: int
    day_of_week: int