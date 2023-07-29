export const arrContinent = [
  'africa',
  'asia',
  'europe',
  'south america',
  'north america',
  'austrialia',
  'antarctica'
]

export const continentToIdx = (continent) => {
  return arrContinent.findIndex((cont) => cont.toLowerCase() === continent.toLowerCase())
}

export const idxToContinent = (idx) => {
  return (arrContinent.filter((_, index) => index === Number(idx)))[0]
}