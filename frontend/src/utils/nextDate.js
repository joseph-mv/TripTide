export function getNextDate(dateString) {
    // Convert the string to a Date object
    let date = new Date(dateString);

    // Get the next date by adding 1 to the current day
    date.setDate(date.getDate() + 1);

    // Format the date as needed (YYYY-MM-DD)
    return date.toISOString().split('T')[0];
}