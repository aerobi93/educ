import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { createAlgo } from "../../utils"

import './styles.scss'

  const Interface =  ({ exercices, sentExercices, resultExercices, sentResultExercices, saveResult}) => {
  const params = useParams()
  let typeExercise = params.type

  const [begin, setBegin] = useState()

  // timer
  let [minutes, setMinutes] = useState(Number)
  let [seconde, setSecond] = useState(Number)
  const [newValue, setNewValue] = useState(Number)
  
  const  intervalAsc = () => {
    setTimeout(()=> {
      if (seconde === 60) {
        setSecond(0)
        setMinutes(minutes + 1)
      }
      else setSecond(seconde + 1)},1000)
  }

  const  intervalDesc = () => {
    setTimeout(()=> {
      if (seconde == 0) {
        setSecond(60)
        setMinutes(minutes - 1)
      }
      else setSecond(seconde - 1)},1000)
  }

  useEffect(() => {
    // the exam time is 10 minutes
    typeExercise == 'simulation' ? setMinutes(0) : setMinutes(20)
    let exerciseArray = []
    for(let i = 0; i <= 20; i++) {
      if (i < 5) {exerciseArray.push(createAlgo(4, 2, 0, 10, true))}
      else if(i < 10) {exerciseArray.push(createAlgo(4, 2, 0, 15, true))}
      else if(i < 15) {exerciseArray.push(createAlgo(6, 2, 0, 15, true))}
      else if(i > 15) {exerciseArray.push(createAlgo(6, 2, 0, 20, true))}
    }
    
 sentExercices(exerciseArray)
  }, [begin])

  useEffect(() => {
    if(exercices && begin === "simulation") {
        intervalAsc()
    }
    else if (exercices && begin === "exam") {
      intervalDesc()
  }
  }, [seconde, exercices])
  
  useEffect(() => {
    if(resultExercices) {
      let totalRight = resultExercices.filter((element) => element.result = "ok").length
      let timerest = minutes + '' + seconde
      saveResult(params.name, typeExercise, timerest )
     
    }
  }, [resultExercices.length == 20])

  const handlerSubmit = (evt) => {
    evt.preventDefault()
    if(isNaN(newValue)) {
      alert('la response doit etre un nombre')
      setNewValue(Number)
      return
    }
    let ok = ''
    // the question is every the first in exercices because it' s slice at each 
    exercices[0].result === +newValue ?  ok = "ok" : ok = "wrong"
    let allResult =
      {
        question: exercices[0].question,
        response: exercices[0].result,
        responseUser: newValue,
        result: ok
      } 
    sentResultExercices(allResult)
    sentExercices(exercices.slice(1, exercices.length))
    setNewValue("") 

  } 
  return (
    <div className="interface">
      {!begin && 
        <div className="interface__begin" onClick={() => setBegin(typeExercise)}>commencer</div>
      }
      {(begin && exercices) && 
        <>
          <div className="interface__counter"> {minutes}  { minutes > 1 ? ' minutes' : " minute"} et  {seconde} {seconde > 1 ? "secondes" : "seconde" }</div>
            <div className="interface__game">
            {
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
                          value={newValue}
                          onChange={(evt)=> setNewValue(evt.target.value)}
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
            resultExercices && resultExercices.reverse().slice(0, 4).reverse().map((element, index) => (
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
        </>  
      }
    </div>
  )
}
export default Interface