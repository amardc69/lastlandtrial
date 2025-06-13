import { differenceInCalendarDays } from "date-fns";
import { TIME_OF_INTEGRATION_LIMIT } from "./const";
import { IntegrationDetails } from "./interface";

const DEFAULT_DELIVERY_DURATION = 7; // days
const MIN_DELIVERY_DURATION = 1;
const MAX_DELIVERY_DURATION = 30;

export const calculatePrice = (
  basePrice: number,
  details: IntegrationDetails
): number => {
  // Clamp the time of integration between the defined min and max, or use the default.
  const timeIntegration = Math.min(
    Math.max(
      Number(details.timeOfIntegration) || TIME_OF_INTEGRATION_LIMIT.default,
      TIME_OF_INTEGRATION_LIMIT.min
    ),
    TIME_OF_INTEGRATION_LIMIT.max
  );
  // If time of integration exceeds the default, add an extra cost per additional second.
  const additionalTimeCost =
    timeIntegration > TIME_OF_INTEGRATION_LIMIT.default
      ? (timeIntegration - TIME_OF_INTEGRATION_LIMIT.default) * 2000
      : 0;
  basePrice += additionalTimeCost;

  // Calculate delivery duration from start and end dates
  let deliveryDuration = DEFAULT_DELIVERY_DURATION;
  if (details.startDate && details.endDate) {
    const start = new Date(details.startDate);
    const end = new Date(details.endDate);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
      deliveryDuration = differenceInCalendarDays(end, start) + 1;
    }
  }
  
  // Clamp the delivery duration
  const clampedDuration = Math.max(
      MIN_DELIVERY_DURATION,
      Math.min(deliveryDuration, MAX_DELIVERY_DURATION)
  );

  // If delivery time is faster than the default, apply an expedite fee per day saved.
  const expediteFee =
    clampedDuration < DEFAULT_DELIVERY_DURATION
      ? (DEFAULT_DELIVERY_DURATION - clampedDuration) * 5000
      : 0;
  basePrice += expediteFee;


  // Apply multipliers based on the integration situation and whether promotion content is provided.
  const situationMultiplier =
    details.integrationSituation === "separate-post" ? 1.2 : 1;
  const promotionMultiplier =
    details.promotionContentProvided === "not-provided" ? 1.1 : 1;

  basePrice = basePrice * situationMultiplier * promotionMultiplier;

  // Get quantity with a fallback to 1 to prevent multiplying by zero.
  const quantity = Number(details.quantity) || 1;

  // Return the final price, which is the unit price multiplied by the quantity.
  return basePrice * quantity;
};