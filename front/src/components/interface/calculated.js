import React, { useEffect, useState } from "react"
import { createAlgo } from "../../utils"
import { useParams } from "react-router-dom"
import { getAge } from "../../utils"

const Calculated  = ({seconde, minute,  childrenData, exercices, sentExercices, resultExercices, sentResultExercices,responseNewValue, setResponseNewValue,begin, setBegin,sentAverage }) => {
  let [finish , setFinish] = useState()

  const  params = useParams()
  const typeExercise = params.type
  const  repetition = typeExercise === "simulation" ?  10 : 20
  
  // with id params get name and age of the child
  const child = childrenData.filter((element) => element.id === params.id)
  const childage = getAge(child[0].birthday)
 

  useEffect(() => {
    let exerciseArray = []
    let numbermin = 0
    let numberMax = 20
    
    let integer = childage > 15 ? false  : true
    let arythmetiqueSign = childage > 10 ? 4  : 2
    let NumberOperation = childage > 10 ? 5  : 4
    if (typeExercise === "exam") {NumberOperation +=1}
    
    for(let i = 0; i <= repetition; i++) {
      if(i % 5 == 0 && i > 0) {
        if(childage >= 5) {
          numberMax += 5
         
        }
        if (childage > 10) {
          numbermin += -100
          numberMax += 100
        }
        NumberOperation +=1
      }
      exerciseArray.push(createAlgo(NumberOperation , arythmetiqueSign, numbermin, numberMax, integer))
    }
  sentExercices(exerciseArray)
  },[])



  useEffect(() => {
    if( begin && (exercices.length == 0 && resultExercices.length > 0) || (typeExercise === "exam" && minute === 0 && seconde === 0 && exercices.length > 0) )  {
      // if  have no response in 20 min
      if (resultExercices.length == 0 && exercices.length > 0){ setBegin(); return} 
      // save note 
      let note = resultExercices.filter((element) =>  element.result === "ok").length
      setFinish(<div className="interface__finish--text">note a l'exercice : {note}/{repetition}</div>)
      
      setTimeout(() => {
        setFinish("")
        sentAverage(note + '/'+repetition)
        setBegin()
      }, 1000 * 3)
    }
  }, [exercices, resultExercices, minute ,seconde] )

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
     
      {finish && finish}
    { (exercices && ! finish )&&
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
    (resultExercices && typeExercise === "simulation")&& resultExercices.slice(-4).reverse().map((element, index) => (
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