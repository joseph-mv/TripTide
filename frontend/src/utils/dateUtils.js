export const today = new Date().toISOString().split("T")[0];
  

export const validateDateRange=(startDate,endDate)=>{
    if (new Date(startDate) > new Date(endDate)) {
      return({success:false, message:"Start date cannot be later than end date"});        
    }
    return ({success:true})
  }

 export function calculateDaysBetweenDates(startDate, endDate) {
    // Convert the dates to JavaScript Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in time (in milliseconds)
    const timeDifference = end - start;

    // Convert the time difference from milliseconds to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    return daysDifference + 1;
  }
 export function convertTimeStringToIntegerHours(timeString) {
    // console.log('timest',timeString)
    // Extract hours and minutes from the string
    const [hoursPart, minutesPart] = timeString?.split(" ");
    const hours = parseInt(hoursPart.replace("h", ""), 10);
    const minutes = parseInt(minutesPart.replace("m", ""), 10);

    // Calculate the total hours
    const totalHours = hours + minutes / 60;

    return totalHours;
  }
