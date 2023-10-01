/**
* Formats a date string from 'YYYY-MM-DD' to 'DD/MM/YYYY'.
*
* @param {string} inputDate - The input date string in 'YYYY-MM-DD' format.
* @returns {string} The formatted date string in 'DD/MM/YYYY' format.
*/
export function formatDate(inputDate) {
   const parts = inputDate.split('-');
   const year = parseInt(parts[0], 10);
   const month = parseInt(parts[1], 10);
   const day = parseInt(parts[2], 10);
   
   // Create a Date object with the parsed year, month, and day
   const date = new Date(year, month - 1, day);
   
   // Use the Date object's methods to get day, month, and year components
   const formattedDay = date.getDate().toString().padStart(2, '0');
   const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
   const formattedYear = date.getFullYear();
   
   const formattedDate = `${formattedMonth}/${formattedDay}/${formattedYear}`;

   return !isNaN(formattedDay || formattedMonth || formattedYear) ? formattedDate : '';
}

/**
* Verifies and replaces consecutive spaces in a word with a single space.
*
* @param {string} word - The word to be verified.
* @returns {string} The word with consecutive spaces replaced.
*/
export function verfyWordSpaces(word){
   var regexEspaces = /\s{2,}/;
   return regexEspaces.test(word) ? word.replace(/\s+/g, ' ') : word 
}
   
/**
* Verifies if a given date string is within a specified year range.
*
* @param {string} date - The date string in 'DD/MM/YYYY' format.
* @param {Object} YearsRestriction - The year restriction object with minYear and substractionYears.
* @returns {boolean} Returns true if the date is outside the specified range; otherwise, false.
*/
export function verfyDate(date,YearsRestriction){
   const parts = date.split('/');
   const year = parts[2];

   const maxYear = new Date().getFullYear() - YearsRestriction.subtractionYears
   const minYear = YearsRestriction.minYear

   return year < minYear || year > maxYear
}

/**
 * Determines whether the age difference between two dates is at least 18 years.
 *
 * @param {string | Date} date1 - The first date for comparison, represented as a string or a Date object.
 * @param {string | Date} date2 - The second date for comparison, represented as a string or a Date object.
 * @returns {boolean} `true` if the age difference is at least 18 years, `false` otherwise.
 */
export function isAgeDifferenceAtLeast18Years(date1, date2) {
    // Convert date strings to Date objects if necessary
    const date1Obj = date1 instanceof Date ? date1 : new Date(date1);
    const date2Obj = date2 instanceof Date ? date2 : new Date(date2);
  
    // Calculate the age difference in years
    const yearDifference = date2Obj.getFullYear() - date1Obj.getFullYear();
  
    // Check if the age difference is at least 18 years
    if (yearDifference > 18) {
      return true;
    } else if (yearDifference === 18) {
      // If the difference is exactly 18 years, check the months and days
      if (
        date2Obj.getMonth() > date1Obj.getMonth() ||
        (date2Obj.getMonth() === date1Obj.getMonth() &&
          date2Obj.getDate() >= date1Obj.getDate())
      ) {
        return true;
      }
    }
  
    // If none of the conditions are met, the age difference is less than 18 years
    return false;
  }
