export const  getAge = function (date) { 
    let newDate = new Date(date)
    let diff = Date.now() - newDate.getTime();
    let age = new Date(diff); 
    return Math.abs(age.getUTCFullYear() - 1970);
  }