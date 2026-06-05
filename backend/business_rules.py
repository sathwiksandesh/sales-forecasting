def inventory_status(
    inventory,
    predicted_sales
):

    if predicted_sales > inventory:
        return "Restock Required"

    return "Inventory Sufficient"


def promotion_recommendation(
    predicted_sales,
    demand_forecast
):

    if predicted_sales < demand_forecast:
        return "Run Promotion"

    return "No Promotion Needed"


def pricing_recommendation(
    price,
    competitor_price
):

    if price > competitor_price:
        return "Price Above Competitor"

    return "Competitive Pricing"


def inventory_risk(
    inventory,
    predicted_sales
):

    ratio = inventory / (predicted_sales + 1)

    if ratio < 0.8:
        return "High Risk"

    elif ratio < 1.2:
        return "Medium Risk"

    return "Low Risk"