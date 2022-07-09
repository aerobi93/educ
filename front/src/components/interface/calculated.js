import React, { useEffect } from "react"
import { createAlgo } from "../../utils"


const Calculated  = ({exercices, sentExercices, resultExercices, sentResultExercices,responseNewValue, setResponseNewValue, repetition }) => {
  useEffect(() => {
    let exerciseArray = []
    for(let i = 0; i <= repetition; i++) {
      if (i < 5) {exerciseArray.push(createAlgo(4, 2, 0, 10, true))}
      else if(i < 10) {exerciseArray.push(createAlgo(4, 2, 0, 15, true))}
      else if(i < 15) {exerciseArray.push(createAlgo(6, 2, 0, 15, true))}
      else if(i > 15) {exerciseArray.push(createAlgo(6, 2, 0, 20, true))}
    }
  sentExercices(exerciseArray)
  },[])


  const handlerSubmit = (evt) => {
    evt.preventDefault()
    if(!responseNewValue.trim()) {
      alert('la reponse ne peut pas etre vide')
      return
    }
    if(isNaN(responseNewValue)) {
      alert('la response doit etre un nombre')
      setResponseNewValue(Number)
      return
    }
    let ok = ''
    // the question is every the first in exercices because it' s slice at each 
    exercices[0].result === +responseNewValue ?  ok = "ok" : ok = "wrong"
    let allResult =
      {
        question: exercices[0].question,
        response: exercices[0].result,
        responseUser: responseNewValue,
        result: ok
      } 
    sentResultExercices(allResult)
    sentExercices(exercices.slice(1, exercices.length))
    setResponseNewValue("") 

  } 
  return (
    <div className="interface__game">
    { exercices &&
      exercices.slice(0,4).reverse().map((element,index) => {
        //for display top to bottom
        if (index === exercices.slice(0,4).length - 1) {
          return (
            <div className="interface__question" key={index}>
              {element.question}
              <form onSubmit={(evt) => handlerSubmit(evt)} className="interface__form"> 
                <input 
                  type="text" 
                  className="interface__form--text" 
                  autoFocus
                  value={responseNewValue}
                  onChange={(evt)=> setResponseNewValue(evt.target.value)}
                /> 
                <button type="submit" className="interface__form--submit" > enregistrer</button>
              </form>
            </div>
          )
        }
        else return <div className="interface__question" key={index}>{element.question}?</div>

      })
    }
    <div className="interface__containerFinished">
    {
    
      //slice length for haver every last result  with 2 reverse for slice the  4 result
    resultExercices && resultExercices.slice(-4).reverse().map((element, index) => (
      <div className="interface__question" key={index}> 
        <span className="interface__finished">{element.question}?</span>
        <span className={`interface__ico interface__ico--${element.result}`}/>
        {element.result === "wrong" && 
        <div className="interface__response">
          <span className="interface__color--red"> ta reponse : {element.responseUser}</span>
          <span className="interface__color--green">la bonne reponse : {element.response}</span>
      </div> 
    }
    </div>
        ))
      }
    </div>
  </div>
    
  )
}
export default Calculated