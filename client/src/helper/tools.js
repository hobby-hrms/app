export const dateDifferenceByDays = (startDate, endDate) => {
  return (Date.parse(endDate) - Date.parse(startDate)) / 1000 / 60 / 60 / 24
}

