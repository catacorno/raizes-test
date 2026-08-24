const PRODUCT_AVAILABILITY_KEY =
  "siarn_product_availability";

function getAvailabilityData() {
  const saved = localStorage.getItem(
    PRODUCT_AVAILABILITY_KEY
  );

  return saved ? JSON.parse(saved) : {};
}

export function getProductAvailability(
  unitId,
  productId
) {
  const availability = getAvailabilityData();

  if (
    availability[unitId] &&
    availability[unitId][productId] !== undefined
  ) {
    return availability[unitId][productId];
  }

  return null;
}

export function getAllProductAvailability() {
  return getAvailabilityData();
}

export function setProductAvailability(
  unitId,
  productId,
  available
) {
  const availability = getAvailabilityData();

  if (!availability[unitId]) {
    availability[unitId] = {};
  }

  availability[unitId][productId] = available;

  localStorage.setItem(
    PRODUCT_AVAILABILITY_KEY,
    JSON.stringify(availability)
  );

  return available;
}