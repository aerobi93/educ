import React,  { useEffect, useState }from "react";
import { Link, useNavigate } from 'react-router-dom'
import {faUser, faCakeCandles} from "@fortawesome/free-solid-svg-icons";
import Connexion from "../../container/form/connexion";

import './styles.scss'

import Input from "../../container/form/input";
import Menu from "../../container/account/menu";
import Result from "../../container/account/result";
import Spinner from "../loader/spin";

import { getAge } from "../../utils";


const Account = ({childId, sentNewLink, loading, changeLoading,changeDisplay, displayAddChild, displayResult, data, nameChild,birthday, sendFormRegisterChildren, messageAjax, findAllData, askLogin, sentAskPassword, changeMessageRequest, changeValue, widthWindow, displayTrigram, deleteChild, isConnect }) => {
  const [error, setError] = useState()
  const [nameChildError, setNameChildError] = useState()
  const [birthdaydError, setBirthdayError] = useState()
  const [displayLogin, setDisplayLogin] = useState()
  const [displayLoginError, setDisplayLoginError] = useState()
  const [displayMessage, setDisplayMessage] = useState()
  const nav = useNavigate()
  

  useEffect(() => {
    if (messageAjax !== "connection ok" && messageAjax!== 'erreur de mot de passe') {
      changeLoading()
      findAllData()
    }
    if(messageAjax === "erreur de mot de passe") {
      setDisplayLoginError(true) 
      changeMessageRequest("")
      changeValue("", "password")
      
      setTimeout(() => {
        setDisplayLoginError(false)    
      }, 1000 * 4)
    }
    if (messageAjax == "compte enfant supprimer") {
      setDisplayMessage('le compte a été supprimer')
      setTimeout(() =>{
        setDisplayMessage("")
      }, 1000 * 3)
    }

    if(messageAjax == "un email de confirmation a ete envoyer") {
      localStorage.removeItem("token")
      isConnect(false)
      nav("/")
      
    }
    if(messageAjax === "connexion ok") {
      if(askLogin === "password" || askLogin === "delete") {
        askLogin === "delete" ? sentNewLink("delete") : sentNewLink("passwordForgotten")
        setDisplayMessage("vous allez recevoir un mail dans quelque instant")
        setTimeout(() => {
          setDisplayMessage("")
          window.localStorage.removeItem('token')
          isConnect(false)
          nav('/')
        }, 1000 * 4)
        
      }
      else if(askLogin ==="changeEmail") {
          nav('/form/changeMail') 
      }
      else if(askLogin == "changeDisplay") {
          changeDisplay("displayAddChild",  !displayAddChild)
          changeDisplay("displayResult",  !displayResult) 
      }
      else if(askLogin.id) {
        changeValue( askLogin.id, "childId")
      }
      else if( askLogin === "deleteChild") {
       changeLoading()
       deleteChild()
      }
      sentAskPassword('')
      changeMessageRequest("")
    }
    
  }, [messageAjax])

  useEffect(()=> {
    if (nameChild !=='') { setNameChildError(false)}
    if (birthday !=='') { setBirthdayError(false)}
  },[nameChild,  birthday] )

  const handlerSubmit = (evt) => {
    evt.preventDefault()
    if(birthday.trim() == "") {setBirthdayError(true)}
    if(nameChild.trim() == "") {setNameChildError(true)}

    else if(getAge(birthday) >= 18) {
      setError("les personnes agées de 18ans ou plus doivent créé un compte avec un role  etudiant d' eux meme")
      setTimeout(() => {
        setError()
      }, 1000 * 3)
      return
    }
    else {
      setError()
      changeLoading()
      sendFormRegisterChildren() 
    }
  }
  useEffect(() => {
    if(askLogin) {
      setDisplayLogin(true)
    }
    if(!askLogin) {setDisplayLogin(false)}
  }, [askLogin])
  return (
    <>
    {loading &&  <div className="account__loading"><Spinner /></div>}
    {error  &&  <div className="account__errorText">{error}</div>}
    {displayMessage && <div className="account__errorText">{displayMessage}</div>}
    {(data && !error && !loading && !displayMessage)  &&  
    <div className={displayTrigram ? "account--80 account" : "account"}>
    {widthWindow > 800 && <Menu />}
      {displayLogin &&
       <div className="account__askLogin">
      <div className="account__askLogin--title">Accés restreint au parent <br />veillez entrez votre mot de passe </div>
      {displayLoginError && <div className="account__askLogin--error">Autorisation refusée</div>}
      <Connexion />
      </div> }
     {!displayLogin && <div className="account__container">
        {displayAddChild && 
          <form className="account__form" onSubmit={(evt)=> handlerSubmit(evt)}>
            
            <Input 
              ico={faUser}
              id={"nameChild"}
              value={nameChild}
              type={"text"}
              placeholder={"nom de l enfant"} 
              className={ nameChildError ? "form__input form__input--red" : "form__input" }
            />

            <Input 
              ico={faCakeCandles}
              id={"birthday"}
              value={birthday}
              className={ birthdaydError ? "form__input form__input--red" : "form__input" }
              type={"date"}
              placeholder={"date de naissance"} 
          />
             <button className="form__submit">enregistrer</button>
          </form>
        }
        { (displayResult && data.student.length > 0) && 
          <>
            {
              data.role === "student" ? 
              (
                <div className="account__result--flex">
                  <Result data ={data} role = {data.role} /> 
                  <Link className= "account__result--link" to='/account/exercise/simulation'>s'entrainer</Link>
                  <Link className= "account__result--link" to='/account/exercise/exam'>mode examen</Link>
                </div>
              ):
                data.student.map((child) => (
                  <div  className="account__result--flex" key = {child.name}>
                    <Result data ={child} role = {data.role} /> 
                  </div>
                ))
              
            }   
          </>
        }
        {
          (data && data.student.length == 0) && <div className="account__message"> aucun enfant associer au compte</div>
        }
      </div>
      }
    </div>}
   </>
  )
}
export default Account