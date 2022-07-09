import React, { useEffect, useState } from "react"
import { useParams } from "react-router"


import Spinner from '../loader/spin'
import Calculated from "../../container/interface/calculated"
import Color from "../../container/interface/color"

import './styles.scss'

  const Interface =  ({ exercices, sentExercices, resultExercices,  saveResult, loading, changeLoading, allCategories, getCategories}) => {
  const params = useParams()
  let typeExercise = params.type
  const [choiceCategory, setChoiceCategory] = useState()
  const [begin, setBegin] = useState()
  
  // timer
  let [minutes, setMinutes] = useState(Number)
  let [seconde, setSecond] = useState(Number)
  const [newValue, setNewValue] = useState(Number)
  let [finish, setFinish] = useState(Boolean)
  
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
    changeLoading()
    getCategories()
  }, [])

  useEffect(() => {
    // the exam time is 10 minutes
    typeExercise == 'simulation' ? setMinutes(0) : setMinutes(10)
  }, [exercices, begin])

  useEffect(() => {
    if(exercices && begin === "simulation") {
        intervalAsc()
    }
    else if (exercices && begin === "exam") {
      intervalDesc()
  }
  }, [seconde, exercices])
  
  useEffect(() => {
    //if never response sent in exament mode
    if((params.type == "exam" && minutes == 0) && !resultExercices) {setBegin(false)}
    if(resultExercices) {
      let totalRight = resultExercices.filter((element) => element.result == "ok").length
      let timerest = minutes + '' + seconde
      setFinish({result : totalRight})
      saveResult(params.name, typeExercise, timerest )
      setTimeout(() => {
        setFinish()
        setBegin(false)
      }, 1000 * 10)
     
    }
  }, [resultExercices.length >= 20 , (params.type == "exam" && minutes == 0 && seconde == 0)])

 
  return (
    <div className="interface">

      {loading && <div className="interface__loader"><Spinner /></div>}
      {
        // selection one category in mode exercices
        (!begin && params.type === "simulation" && !loading && !choiceCategory   && allCategories) &&
        <div className="interface__category"> Choisir une categorie d' exercice
          {
             allCategories.map((element) => 
              <div  
                key={element.name}
                className="interface__category--name" 
                onClick={() => setChoiceCategory(element.name)}
              > 
                {element.name}
              </div>
            )
          }
        </div>
      }
      
      { // begin the exercices
      (!begin && params.type === "simulation" && !loading && choiceCategory) && 
        <div className="interface__begin" onClick={() => setBegin(typeExercise)}>commencer</div>
      }
      
      {(begin) && 
        <>
          <div className="interface__counter">
            {minutes}  { minutes > 1 ? ' minutes' : " minute"} et  {seconde} {seconde > 1 ? "secondes" : "seconde" }
          </div>
          {choiceCategory === "arythmetique" && <Calculated  repetition={20} />}
          {choiceCategory === "couleurs et formes" && <Color repetition={20} />}
        </>  
      }
      {finish && <div className={`interface__average ${finish.result < 10 ? "interface__average--red" : "interface__average--green"}`}> {finish.result}/20</div>}
    </div>
    
  )
}
export default Interface