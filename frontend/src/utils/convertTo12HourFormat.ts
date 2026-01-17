export function convertTo12HourFormat(time24) {
  
    const [hours, minutes] = time24.split(':');
  
    // Create a new Date object and set the time
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(0); // Optional: Set seconds to 0
  
    // Convert to 12-hour format
    return date.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }
  
