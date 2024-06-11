function convertTime(seconds) {
   if (!seconds) return 'now'

   // Calculate days, hours, minutes, and remaining seconds
   const days = Math.floor(seconds / (24 * 3600));
   seconds %= (24 * 3600);
   const hours = Math.floor(seconds / 3600);
   seconds %= 3600;
   const minutes = Math.floor(seconds / 60);
   seconds %= 60;

   // Construct the time string
   let timeString = "";
   if (days > 0) {
       timeString += days === 1 ? "1 day" : days + " days";
       timeString += ", ";
   }
   if (hours > 0) {
       timeString += hours === 1 ? "1 hour" : hours + " hours";
       timeString += ", ";
   }
   if (minutes > 0) {
       timeString += minutes === 1 ? "1 minute" : minutes + " minutes";
       timeString += " and ";
   }
   timeString += seconds === 1 ? "1 second" : seconds + " seconds";

   return timeString;
}

// Test cases
console.log(convertTime(62));    // Output: "1 minute and 2 seconds"
console.log(convertTime(3662)); 
console.log(convertTime(15731080)); 