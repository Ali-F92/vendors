export const getPaginatedVendors = async (
  lat,
  long,
  page = 0,
  pageSize = 10
) => {
  const res = await fetch(
    `https://snappfood.ir/mobile/v3/restaurant/vendors-list?lat=${lat}&long=${long}&page=${page}&page_size=${pageSize}`
  );
  return res.json();
};
