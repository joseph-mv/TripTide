export const dailyItinerary = (i: number, date: string) => ({
  day: i + 1,
  date: date,
  todo: [],
  startingPoint: "",
  endPoint: "",
  notes: "",
});