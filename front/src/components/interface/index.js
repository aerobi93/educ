import React, { useEffect, useState } from "react"
import { useParams } from "react-router"


import Spinner from '../loader/spin'
import Calculated from "../../container/interface/calculated"
import Color from "../../container/interface/color"

import './styles.scss'

  const Interface =  ({ exercices, sentExercices, resultExercices,  saveResult, loading, changeLoading, allCategories, getCategories, setBegin, begin, average}) => {
  const params = useParams()
  let typeExercise = params.type
  const [choiceCategory, setChoiceCategory] = useState()
  const [totalExercices, setTotalExercices] = useState()
  
  useEffect(() => {
    if(average) {
      let timerest = minutes + " : " + seconde 
      setChoiceCategory()
      saveResult(timerest)
    }
  }, [average])

  useEffect(() => {
    let allExercices = []
    allExercices.push(choiceCategory)
    
  },[choiceCategory])
  

  // timer
  let [minutes, setMinutes] = useState(Number)
  let [seconde, setSecond] = useState(Number)
  
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
    
  }, [begin == false])

  useEffect(() => {
    // the exam time is 10 minutes
    typeExercise == 'simulation' ? setMinutes(0) : setMinutes(10)
  }, [exercices, begin])

  useEffect(() => {
    if(exercices && begin && typeExercise=== "simulation") {
        intervalAsc()
    }
    else if (exercices && begin && typeExercise === "exam") {
      intervalDesc()
  }
  }, [seconde, exercices])


  return (
    <div className="interface">

      {loading && <div className="interface__loader"><Spinner /></div>}
      {
        // selection one category in mode exercices
        (!begin && params.type === "simulation" && !loading && !choiceCategory  && allCategories) &&
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
      {}
      {(begin) && 
        <>
          <div className="interface__counter">
            {minutes}  { minutes > 1 ? ' minutes' : " minute"} et  {seconde} {seconde > 1 ? "secondes" : "seconde" }
          </div>
          {(choiceCategory === "arythmetique" && totalExercices[0] === "arythmetique" ) && <Calculated  repetition={20} />}
          {choiceCategory === "couleurs et formes" && <Color repetition={20} />}
        </>  
      }
    </div>
    
  )
}
export default Interface