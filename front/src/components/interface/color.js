import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark, faCircle, faHouse, faTree, faCow, faDog, faCat, faChild, faPersonDress, faCloud, faTriangleCircleSquare} from "@fortawesome/free-solid-svg-icons";



const Color = ({exercices, sentExercices, resultExercices, sentResultExercices,responseNewValue, setResponseNewValue, repetition}) => {

  const colorExercices = [
    { color: "red", colorName : "rouge" },
    { color: "yellow", colorName : "jaune" },
    { color: "black", colorName : "noir" },
    { color: "white", colorName : "blanc" },
    { color: "green", colorName : "vert" },
    { color: "blue", colorName : "bleu" },
    { color: "pink", colorName : "rose" },
    { color: "orange", colorName : "orange" },
    { color: "brown", colorName : "marron" }
  ]

  const formExercices = [
    { awesome : faXmark, formName : "croix", gender : "une"},
    { awesome : faCircle, formName : "rond,cercle", gender : "un" },
    { awesome : faHouse, formName : "maison" , gender : "une"},
    { awesome : faTree, formName : "arbre,sapin" , gender : "un"},
    { awesome : faCow, formName : "vache,ruminant,animal" , gender : "une"},
    { awesome : faChild, formName : "garcon,homme,hummain" , gender : "un"},
    { awesome : faPersonDress, formName : "fille,femme,hummain" , gender : "une"},
    { awesome : faCloud, formName : "nuage" , gender : "un"},
    { awesome : faDog, formName : "chien,animal,canidé", gender : "un" },
    { awesome : faCat, formName : "chat,animal,félin" , gender : "un"},
  ] 

  const randomQuestion  = [
    "qu'est ce que ca représente?",
    "c'est de quel couleur?",
    `qu'est ce que ca représente? Et c'est quoi sa couleur?`,
    "écrit ce que ce que  ca représente",
    "écrit ce que ce que  ca représente et sa couleur",
    "écrit sa couleur"
  ]

  useEffect(() => {
    let exerciseArray = []
    for(let i = 0; i < repetition ; i++) {

      let arrayColorRandom = []
      let arrayFormRandom = []
      let arrayIconRandom = []
    
      
      let randomForm  = Math.floor( Math.random() * formExercices.length)
      let randomcolor  = Math.floor( Math.random() * colorExercices.length) 
      let questionR = Math.floor( Math.random() * randomQuestion.length + 2)
      let newQuestion = ""
      let nameFormSplit =  formExercices[randomForm].formName.split(/[,]/g)
      let newNameRandom  = Math.floor(Math.random() * nameFormSplit.length)

      questionR = 6

      if(questionR === randomQuestion.length) {
          newQuestion = "trouve la représentation d'" + formExercices[randomForm].gender + " " + nameFormSplit[newNameRandom]
      }
      else if(questionR === randomQuestion.length + 1) {
          newQuestion = "trouve la représentation d'" + ' ' + formExercices[randomForm].gender + " " + nameFormSplit[newNameRandom] + ' de couleur' + " " + colorExercices[randomcolor].colorName
      }
      else newQuestion = randomQuestion[questionR]


      if(newQuestion.includes("couleur") && !newQuestion.includes("écrit")&& !newQuestion.includes("représentation") && arrayColorRandom.length <= colorExercices.length) {
        do {
          let randomcolorDoWhile  = Math.floor( Math.random() * colorExercices.length)
          if(!arrayColorRandom.includes(colorExercices[randomcolorDoWhile].colorName))  {
            arrayColorRandom.push(colorExercices[randomcolorDoWhile].colorName)
          }
        }
        while (arrayColorRandom.length <= colorExercices.length)      
      }
      
      if(newQuestion.includes("représent") && !newQuestion.includes("écrit") && arrayFormRandom.length < formExercices.length ) {
         do{
          let randomFormDoWhile  = Math.floor( Math.random() * formExercices.length)
          let nameFormSplitDoWhile =  formExercices[randomFormDoWhile].formName.split(/[,]/g)
          let newNameRandomDoWhile  = Math.floor(Math.random() * nameFormSplitDoWhile.length)
          
         
          if(!arrayFormRandom.includes(nameFormSplitDoWhile[newNameRandomDoWhile])) {
              arrayFormRandom.push(nameFormSplitDoWhile[newNameRandomDoWhile])
          }
        }
        while(arrayFormRandom.length < formExercices.length )
      }

      if(newQuestion.includes("représentation") && arrayIconRandom.length < 15) { 
        let random = Math.floor( Math.random() * 15 )
        do {
          let randomFormDoWhile  = Math.floor( Math.random() * formExercices.length)
          let randomColorDoWhile  = Math.floor( Math.random() * colorExercices.length)

          if (arrayIconRandom.length == random) {
            console.log("font")
            arrayIconRandom.push({color: colorExercices[randomcolor].color, icon : formExercices[randomForm].awesome})
          }
          else if (randomColorDoWhile !== randomcolor && randomForm !== randomFormDoWhile) {
            console.log('ok')
            arrayIconRandom.push({color: colorExercices[randomColorDoWhile].color, icon : formExercices[randomFormDoWhile].awesome})
          }
        }
        while( arrayIconRandom.length < 15)
      }

      exerciseArray.push({
        form : formExercices[randomForm],
        color : colorExercices[randomcolor],
        question : newQuestion,
        arrayColorRandom,
        arrayFormRandom,
        arrayIconRandom

      })
    }
    sentExercices(exerciseArray)
    
  }, [])
   
  const handlerSubmit =(evt) => {
    evt.preventDefault()
    let resultQuestion = ""

    if(!responseNewValue.trim()) { alert("la reponse ne peut pas etre vide")}
    
    if (exercices[0].question.includes('couleur') && (exercices[0].question.includes("représente") || exercices[0].question.includes("représentation"))) {
      if(responseNewValue.includes(exercices[0].color.colorName)) {
        let split  = exercices[0].form.formName.split(/[,]/g)
        split.map((element) =>  {
          if(responseNewValue.includes(element)) {
            resultQuestion = "ok"
          }
          else resultQuestion = "wrong"
        })
      }
      else resultQuestion = "wrong" 
    }
    
    else if(exercices[0].question.includes('couleur')){
      resultQuestion = exercices[0].color.colorName == responseNewValue.toLowerCase() ? "ok" : "wrong" 
    }

    else if (exercices[0].question.includes("représente")) {
      // one icon can be represente many things
      let splitResponse = exercices[0].form.formName.split(/[,]/g)
      resultQuestion = splitResponse.includes(responseNewValue.toLowerCase())  ? "ok" : "wrong"
    }

    setResponseNewValue('')
  }
  return (
    <div className="interface__game">
      
      { //display the question 
        exercices && <div className="interface__color--title"> {exercices[0].question} </div> } 
      
      { // if question need to display one icon :  Fontawesome
        (exercices && !exercices[0].question.includes("trouve") &&
          exercices[0].form.awesome ) && 
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

      { exercices && (exercices[0].question.includes('représent') && !exercices[0].question.includes('écrit')) && 
        <div className="interface__color--containerFlex"> 
          {
            
          }
        </div>      
      }      

    </div>
  )
}
export default Color