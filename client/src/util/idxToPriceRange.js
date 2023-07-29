export const arrPriceRanges = [
  "0-25000000",
  "25000000-50000000",
  "50000000-75000000",
  "75000000-100000000",
  "100000000-200000000"
]

export const priceRangeToIndex = (priceRange) => {
  const index = arrPriceRanges.findIndex(priceRg => priceRg === priceRange)

  return index
}