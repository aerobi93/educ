

  export const  getAge = function (date) { 
    let newDate = new Date(date)
    let diff = Date.now() - newDate.getTime();
    let age = new Date(diff); 
    return Math.abs(age.getUTCFullYear() - 1970);
  }

export const createAlgo = (repetition, signMax, numberMin, numberMax, integer  ) => {
  let equation = ''
  const sign  =[
    '+',
    '-',
    '*',
    '/',
  ]
  for (let i = 0; i < repetition; i++) {
    let number = Math.random()  * (numberMax - numberMin) + numberMin
    let signNumber = Math.floor(Math.random() * (signMax - 0) - 0)
    if (integer || signNumber >= 2 ) {number = Math.floor(number)}
    else  number = Math.round(number * 100) /100
    equation += `${sign[signNumber] + " "}  ${number}`
    
  }
  let newEquation = equation.slice(1, equation.length)
  let question = newEquation + '='
  return {
    question : question.trim(),
    result :   Math.round(eval(newEquation) *100)  /100 
  } 
}

export const randomNumber = (min, max ) => {
  return Math.floor((Math.random()  * (max - min) ) - min)
}