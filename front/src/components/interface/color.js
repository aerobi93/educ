import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark, faCircle, faHouse, faTree, faCow, faDog, faCat, faChild, faPersonDress, faCloud, faTriangleCircleSquare} from "@fortawesome/free-solid-svg-icons";
import { randomNumber } from "../../utils";


const Color = ({exercices, sentExercices, resultExercices, sentResultExercices,responseNewValue, setResponseNewValue, repetition}) => {
  let [ finish, setFinish] = useState()
  let [badResponse, setBadResponse] = useState(Number)
  let [goodResponse, setGoodResponse] = useState(Number)
  
  useEffect(() => {
    console.log("total bon", goodResponse)
    console.log("total movais", badResponse)
  }, [exercices.length === 0 ])

  const colorExercices = [
    { color: "red", colorName : "rouge" },
    { color: "yellow", colorName : "jaune" },
    { color: "black", colorName : "noir" },
    { color: "white", colorName : "blanc" , feminine : "blanche"},
    { color: "green", colorName : "vert" , feminine : "verte"},
    { color: "blue", colorName : "bleu" },
    { color: "pink", colorName : "rose" },
    { color: "orange", colorName : "orange" },
    { color: "brown", colorName : "marron" }
  ]

  const formExercices = [
    { awesome : faXmark, formName : "une croix"},
    { awesome : faCircle, formName : "un rond, un cercle"},
    { awesome : faHouse, formName : "une maison" },
    { awesome : faTree, formName : "un arbre, un sapin"},
    { awesome : faCow, formName : "une vache, un ruminant, un animal"},
    { awesome : faChild, formName : "un garcon, un homme, un hummain" },
    { awesome : faPersonDress, formName : "une fille, une femme, un hummain"},
    { awesome : faCloud, formName : "un nuage"},
    { awesome : faDog, formName : "un chien, un animal, un canidé"},
    { awesome : faCat, formName : "un chat, un animal, un félin"}
  ] 

  const randomQuestion  = [
    "qu'est ce que ca représente?",
    "c'est de quel couleur?",
    `qu'est ce que ca représente? Et c'est quoi sa couleur?`,
    "écrit ce que ce que ca représente avec son article 'un, une'",
    "écrit ce que ce que ca représente avec son article 'un, une' et sa couleur",
    "écrit sa couleur"
  ]

  // creation question 
  useEffect(() => {
    let exerciseArray = []
    for(let i = 0; i < repetition ; i++) {
      let arrayColor = []
      let arrayForm = []
      let arrayIcon = []
      let question  = ''
      let randomForm  = randomNumber(0 , formExercices.length )
      randomForm = 0
      let randomcolor  = randomNumber(0 , colorExercices.length )
      randomcolor = 3
     // actual random color with name
      let color = colorExercices[randomcolor]
      let colorName = color.colorName
      //actual random form with 1 name into the name list 
      let listForm = formExercices[randomForm]
      let listFormName =  listForm.formName.split(/[,]/g)
      let formName  = listFormName[randomNumber(0 , listFormName.length)]
      // random question
      let indexQuestion = randomNumber(0 , randomQuestion.length +2)
      //add new question 
      indexQuestion = 4

      if(indexQuestion  > randomQuestion.length - 1) {
        if( indexQuestion === randomQuestion.length ) {
          question =  "trouve la représentation d'" + " " + formName
        }
        else if (indexQuestion == randomQuestion.length + 1) {
          question =  "trouve la représentation d'" + " " + formName + ' de couleur' + " " + colorName
        }
      }
      else question = randomQuestion[indexQuestion]


     //create the liste of color as arrayColor but in desorder
      if((indexQuestion == 1 || indexQuestion == 2 ) && arrayColor.length < colorExercices.length) {
        let randomPlacement = randomNumber(0, colorExercices.length)
        do {
          let newRandomColor = randomNumber(0, colorExercices.length)
          let newColor = colorExercices[newRandomColor].colorName
          // add the actual response color  in random placement
          if(arrayColor.length === randomPlacement) {
            arrayColor.push(colorName)
          }
          else if(!arrayColor.includes(newColor) && newColor !== colorName) {
            arrayColor.push(newColor)
          }
        } while (arrayColor.length < colorExercices.length)
      }
      //create list of name in desorder
      if((indexQuestion == 0 || indexQuestion == 2) && arrayForm.length < formExercices.length ) {
        let randomPlacement = randomNumber(0, colorExercices.length)
        do {  
          let randomListForm = randomNumber(0, formExercices.length)
          let listOfName = formExercices[randomListForm].formName
            .split(/[,]/g)
            .map((element) => element.trim())
          let newFormName = listOfName[randomNumber(0, listOfName.length)]

          if(arrayForm.length == randomPlacement) {
            arrayForm.push(formName)
          }
          else if(!arrayForm.includes(newFormName) && formName !== newFormName ) {
            arrayForm.push(newFormName)
          }
        } while (arrayForm.length < formExercices.length)
      }
      //create a list of random fontawesome with random color 
      if((indexQuestion == randomQuestion.length  || indexQuestion ==  randomQuestion.length + 1 ) && arrayIcon.length < 15) {
        let randomPlacement = randomNumber(0, 14)
        
        do {
          let newForm = formExercices[randomNumber(0, formExercices.length)]
          let newColor  = colorExercices[randomNumber(0, colorExercices.length)]
       
          if(arrayIcon.length === randomPlacement) {
            arrayIcon.push({color :  color, icon : listForm.awesome, formName  })
          }

          else if (newColor.colorName !== colorName && listForm.awesome.iconName !== newForm.awesome.iconName) {
            let found = ''
            arrayIcon.map((element) => {
              if( element.color.colorName == newColor.colorName &&  element.icon.iconName  == newForm.awesome.iconName) {found = 'true'}
              return
            })
            if(found == '') {
             arrayIcon.push({color: newColor, icon: newForm.awesome, formName : newForm.formName})
            }
          }
        } while(arrayIcon.length < 15) 
      }

      exerciseArray.push({
        form : listForm,
        color,
        question,
        arrayColor,
        arrayForm,
        arrayIcon
      })
      sentExercices(exerciseArray)
    }
  }, [])

  const hanlderClick = (value) => {
    let question  = exercices[0].question
    if(question != randomQuestion[2]) {
      treatQuestion(value)
    }
    else {
      if(value.match(/[+]/)) {
       treatQuestion(value)
      }
      else return
    }
  }

  const handlerSubmit = (evt) => {
    evt.preventDefault()
    treatQuestion(responseNewValue)
  }

  const treatQuestion =  (value) => {
    let exercicesQuestion  = exercices[0].question
    let exercicesForm  = exercices[0].form
    let exercicesColor = exercices[0].color
    let resultQuestion = ""

    //verification the question whith representation && color 
    if (exercicesQuestion.includes("représent") && exercicesQuestion.includes('couleur')) {
      let splitName = exercicesForm.formName.split(/[,]/g)
      splitName.map((element) => {
        let newElement = element.trim()
        console.log(newElement + ' ' + exercicesColor.colorName, 'value', value, value.length)
        if (element.includes("une")) {
          if(exercicesColor.feminine) {
            if (value.trim() === newElement + " " + exercicesColor.feminine) {
              resultQuestion = "ok"
              return 
            }
          }
          else if (value == newElement + ' ' + exercicesColor.colorName)  {
            resultQuestion = "ok"
            return 
          }
        }
        else if (element.includes("un") && value == newElement + ' ' + exercicesColor.colorName)  {
          console.log("un")
          resultQuestion = "ok"
          return
        }
      })
    }
    //verification of question with just représentation
    else if(exercicesQuestion == randomQuestion[0] || exercicesQuestion == randomQuestion[3]){
      let splitName = exercicesForm.formName.split(/[,]/g)
      splitName.map((element) => {
        if(value.trim() == element.trim()) {
         resultQuestion ='ok'
         return   
        } 
      })

      if(resultQuestion !== 'ok') { resultQuestion = "wrong"} 
    }
    //verfication of question with just color 
    else if(exercicesQuestion == randomQuestion[1] || exercicesQuestion == randomQuestion[5]) {
      exercicesColor.colorName === value ? resultQuestion = "ok" : resultQuestion = "wrong"
    }
   

    //treating of  the result at this question 
    if( resultQuestion === "ok"){
      setFinish(<div className="interface__finish  interface__finish--good">bonne response</div>) 
    }
    else {
      if (exercicesQuestion == randomQuestion[0] || exercicesQuestion == randomQuestion[3]) {
        setFinish(
          <div className=" interface__finish  interface__finish--bad" >
            mauvaise response 
            <div className="interface__finish--min"> bonne reponse possible : </div>
            <div className="interface__finish--min">{exercicesForm.formName}</div>
          </div>
          )
      }
      else if (exercicesQuestion == randomQuestion[1] || exercicesQuestion == randomQuestion[5]) {
        setFinish(
          <div className=" interface__finish  interface__finish--bad" >
            mauvaise response 
            <div className="interface__finish--min"> la bonne response est : {exercices[0].color.colorName} </div>
          </div>
          )
      }
      else if(exercicesQuestion.includes("représent") && exercicesQuestion.includes('couleur')) {
        setFinish(
          <div className=" interface__finish  interface__finish--bad" >
            mauvaise response :
            
            <div className="interface__finish--min">couleur : 
              {exercices[0].color.feminine  ?  exercices[0].color.colorName+'/'+exercices[0].color.feminine : exercices[0].color.colorName}
            </div>
            <div className="interface__finish--min">representation : {exercices[0].form.formName}</div>
          </div>
          )
      }
    }


    //timer differential in function if it' s good or not good and  slice exercices for display the next
    let duration  = resultQuestion === "ok" ? 1000 : 1000 * 4
    setTimeout(() => {
      setFinish("")
      sentExercices(exercices.slice(1, exercices.length))
    }, duration)
    setResponseNewValue('')
  }

  return (
    <>
      {finish && finish}
      {!finish && <div className="interface__game">
            
        { //display the question 
          exercices && <div className="interface__color--title"> {exercices[0].question} </div> 
        }

        { // if question need to display one icon :  Fontawesome
          (exercices && !exercices[0].question.includes("trouve") && exercices[0].form.awesome ) && 
            <FontAwesomeIcon icon={exercices[0].form.awesome} className="interface__color--ico"  style={{color: exercices[0].color.color}}/>    
        }  

      { // if question need one writting response
      (exercices && exercices[0].question.includes("écrit")) && 
        <form className="interface__color--form" onSubmit={(evt) => handlerSubmit(evt)}>
          <input 
            type="text"
            className="interface__color--input"
            value={responseNewValue} 
            onChange={(evt) => setResponseNewValue(evt.target.value)}
            placeholder="ta reponse?"
          /> 
          <input type="submit" className="interface__color--submit" value="validez" />
        </form> 
      }

      {// display the list of name name 
      exercices && (exercices[0].question === randomQuestion[0] || exercices[0].question === randomQuestion[2]) && 
      <div className="interface__color--containerFlex">
        <span className="interface__color--containerFlex--title">liste resprésentations</span>
        {exercices[0].arrayForm.map((element, index) => 
          <div 
            className="interface__color--elementText"
            key={index}
            onClick={() =>  {
            responseNewValue  =="" ? setResponseNewValue(element) : setResponseNewValue(element + '+' + responseNewValue)
            responseNewValue  =="" ? hanlderClick(element) : hanlderClick(element + '+' +responseNewValue)
            }}
          >
        {element}
        </div>
        )}
      </div>
      }
      {//display list of color 
      exercices && (exercices[0].question == randomQuestion[1] || exercices[1].question == randomQuestion[2]) && 
      <div className="interface__color--containerFlex">
        <span className="interface__color--containerFlex--title">liste des couleurs</span>
        {exercices[0].arrayColor.map((element, index) => 
          <div 
            className="interface__color--elementText"
            key={index}
            onClick={() =>  {
              responseNewValue == "" ? setResponseNewValue(element) : setResponseNewValue(element + '+' + responseNewValue)
              responseNewValue  =="" ? hanlderClick(element) : hanlderClick(element + '+'+responseNewValue)
            }}
          >
            {element}
          </div>
        )}
      </div>
      }

      {
      exercices && (exercices[0].question.includes("trouve")) && 
      <div className="interface__color--containerFlex">
        <span className="interface__color--containerFlex--title">liste des icones</span>
          {exercices[0].arrayIcon.map((element) =>  { 
            return (
                <FontAwesomeIcon 
                icon={element.icon} 
                className="interface__color--listIcon"  
                style={{color: element.color.color}}
                onClick = {(evt) => {
                  hanlderClick(exercices[0].color.color +'+'+exercices[0].form.formName)}}
              />
            )
          })}
      </div>
      }
      </div> }
    </>

  )
}
export default Color