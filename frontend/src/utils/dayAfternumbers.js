
/**
 * Calculates the date after a specified number of days from the given start date.
 *
 * @param {string} startDate - The start date in ISO format (YYYY-MM-DD).
 * @param {number} number - The number of days to add to the start date.
 * @returns {string} The resulting date in ISO format (YYYY-MM-DD).
 *
 * @example
 * // Returns '2025-01-10'
 * dayAfterNumber('2025-01-01', 10);
 *
 * @example
 * // Returns '2023-03-15'
 * dayAfterNumber('2023-03-01', 15);
 */
export function dayAfterNumber(startDate, number) {
    console.log(startDate,number)
  // Convert the date to JavaScript Date objects
  const end = new Date(startDate);
  // Get the next date by adding the specified number of days to the current day
  end.setDate(end.getDate() + number - 1);
  console.log(end.toISOString().split('T')[0])
  return end.toISOString().split('T')[0];
}


