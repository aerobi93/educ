import React, { useEffect, useState } from "react"
import { useNavigate, useParams} from "react-router"



import Spinner from '../loader/spin'
import Calculated from "../../container/interface/calculated"
import Color from "../../container/interface/color"

import './styles.scss'

const Interface =  ({childId, sentAverage, exercices, minute, seconde, setMinute, setSeconde,  saveResult, loading, changeLoading, allCategories, getCategories, setBegin, begin,  average}) => {
  const params = useParams()
  const typeExercise = params.type
  const [choiceCategory, setChoiceCategory] = useState()
  const [choiceCategoryID, setChoiceCategoryID] = useState()

  const [minuteState, setMinuteState] = useState()
  const [secondeState, setSecondeState] = useState()
  const nav = useNavigate()
  useEffect(() => {
    if(!childId) {
      nav("/")
    }
  }, [])
  useEffect(() => {
    if(average !== "") {
      let timerest =  typeExercise == "simulation" ? 
         "fait en " +minute + ' min et ' + seconde + " sec":
         "fait en : " + (19 - minute) + " min et " + (60 -seconde) + " sec"
      saveResult(timerest, typeExercise === "exam", choiceCategoryID, average)
      setChoiceCategory()
      sentAverage("")
      nav('/')
    
    }
  }, [average])

  useEffect(() => {
    let allExercices = []
    allExercices.push(choiceCategory)
    
  },[choiceCategory])
  


  useEffect(() => {
    if(!begin) {
      changeLoading()
      getCategories() 
    } 
    if (begin) {
      if (typeExercise == "simulation") {
        setMinute(0)
        setMinuteState(0)
        setSeconde(0)
        setSecondeState(0)
      }
      else {
        setMinute(0)
        setMinuteState(0)
        setSeconde(10)
        setSecondeState(10)
      }
    }
  }, [begin])
  
  useEffect(() => {
    if (begin) {
      if(typeExercise === "exam") {
        if(seconde === 0) {
          setTimeout(() => { 
            setSeconde(60)
            setSecondeState(60)
            setMinute(minuteState - 1)
            setMinuteState(minuteState - 1)
          }, 1000)  
        }
        else {
          setTimeout(() => {
            setSeconde(secondeState - 1)
            setSecondeState(secondeState - 1)
          },1000)
        }
      }
      if(typeExercise === "simulation") {
        if(seconde === 60) {
          setTimeout(() => { 
            setSeconde(0)
            setSecondeState(0)
            setMinute(minuteState + 1)
            setMinuteState(minuteState + 1)
          }, 1000)  
        }
        else {
          setTimeout(() => {
            setSeconde(secondeState + 1)
            setSecondeState(secondeState + 1)
          },1000)
        }
      }
   
    }
  }, [secondeState])

    

  return (
    <div className="interface">

      {loading && <div className="interface__loader"><Spinner /></div>}
      {
        // selection one category in mode exercices
        (!begin  && !loading && !choiceCategory  && allCategories) &&
        <div className="interface__category"> 
        <div className="interface__category--title">Choisir une categorie d' exercice</div>
          {
             allCategories.map((element) => 
              <div  
                key={element.name}
                className="interface__category--name" 
                onClick={() => {
                  setChoiceCategory(element.name)
                  setChoiceCategoryID(element.id)}}
              > 
                {element.name}
              </div>
            )
          }
        </div>
      }
      
      { // begin the exercices
      (!begin  && !loading && choiceCategory) && 
        <div className="interface__begin" onClick={() => setBegin(!begin)}>commencer</div>
      }
      {begin && 
        <>
          <div className="interface__counter">
            {minute}  { minute > 1 ? ' minutes' : " minute"} et  {seconde} {seconde > 1 ? "secondes" : "seconde" } 
          </div>
          {choiceCategory === "arythmetique"&& <Calculated />}
          {choiceCategory === "couleurs et formes" && <Color />}
        </>  
      }
    </div>
    
  )
}
export default Interface