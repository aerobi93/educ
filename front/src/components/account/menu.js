import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Menu = ({ role, changeDisplay, displayResult, displayAddChild, sentNewLink }) => {
  
  const nav = useNavigate()

  const handlerClick = ( value) => {
   let text = "etes vous sur de vouloir"
   if(value == "password") { text +=  " " + "modifier votre mot de passe"}
   if(value == "email") { text += " " + "modifier votre email"}
   if(value == "delete") { text += " " + "supprime votre compte"}
   
   let confirm = window.confirm(text )
   if(!confirm) {return}
   if (value === "password"  || value === "delete"&& confirm) {
    if (value === "password"){ sentNewLink("passwordForgotten")}
    else if(value === "delete"){sentNewLink("delete")}
   
    window.localStorage.removeItem('token')
    nav('/') 
   }
   
   if (value === "email" && confirm) {
    nav('/form/changeMail') 
   }

  }
  const handlerDisplay = (value) => {
    // every one open
    changeDisplay("displayAddChild",  !displayAddChild)
    changeDisplay("displayResult",  !displayResult)
   
  }

  return(
    <div className="account__menu">
      { role === "parent" &&  <div className="account__menu--link" onClick={() => handlerDisplay("child")}>
        ajouter un compte enfant
      </div> }
  
      <div className="account__menu--link" onClick={() => handlerClick("delete")}>
        suprimmer mon compte
      </div>
      <div className="account__menu--link" onClick={() => handlerClick("password")}>
        modifier mon mot de passe
      </div>
      <div className="account__menu--link" onClick={() => handlerClick("email")}>
        modifier mon email
      </div>
      <div className="account__menu--link" onClick={() => handlerDisplay("result")}>
        tous mes resultat
      </div>
    </div>
  )
}
export default Menu