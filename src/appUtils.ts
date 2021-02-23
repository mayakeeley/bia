export const getAgeFromDOB = (dob: string) => {
  var birthdate = new Date(dob).getTime();
  var cur = new Date().getTime();
  var diff = cur - birthdate; // This is the difference in milliseconds
  var age = Math.floor(diff / 31557600000); // Divide by 1000*60*60*24*365.25
  return age;
};
