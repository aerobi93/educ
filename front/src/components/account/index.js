import React,  { useEffect, useState }from "react";
import { Link, useNavigate } from 'react-router-dom'
import {faUser, faCakeCandles} from "@fortawesome/free-solid-svg-icons";
import Connexion from "../../container/form/connexion";

import './styles.scss'

import Input from "../../container/form/input";
import Menu from "../../container/account/menu";
import Result from "./result";
import Spinner from "../loader/spin";

import { getAge } from "../../utils";


const Account = ({sentNewLink, role, loading, changeLoading,changeDisplay, displayAddChild, displayResult, data, nameChild,birthday, sendFormRegisterChildren, messageAjax, findAllData, askLogin, sentAskPassword, changeMessageRequest, changeValue }) => {
  const [error, setError] = useState()
  const [nameChildError, setNameChildError] = useState()
  const [birthdaydError, setBirthdayError] = useState()
  const [displayLogin, setDisplayLogin] = useState()
  const [displayLoginError, setDisplayLoginError] = useState()
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

    if(messageAjax === "connexion ok") {
      console.log('ok')
      if(askLogin === "password" || askLogin === "delete") {
        askLogin === "delete" ? sentNewLink("delete") : sentNewLink("passwordForgotten")
        window.localStorage.removeItem('token')
        nav('/') 
      }
      else if(askLogin ==="changeEmail") {
          nav('/form/changeMail') 
      }
      else if(askLogin == "changeDisplay") {
        console.log(displayResult, displayAddChild)
          changeDisplay("displayAddChild",  !displayAddChild)
          changeDisplay("displayResult",  !displayResult) 
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
    {(data && !error && !loading)  &&  
    <div className="account">
      <Menu />
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
        { displayResult && 
          <>
            {
              role === "student" ? 
              (
                <div className="account__result--flex">
                  <Result data ={data} role = {role} /> 
                  <Link className= "account__result--link" to='/account/exercise/simulation'>s'entrainer</Link>
                  <Link className= "account__result--link" to='/account/exercise/exam'>mode examen</Link>
                </div>
              ):
                data.student.map((child) => (
                  <div  className="account__result--flex" key = {child.name}>
                    <Result data ={child} role = {role} /> 
                    <Link className= "account__result--link" to={`/account/exercise/simulation/${child.id}`}>s'entrainer</Link>
                    <Link className= "account__result--link" to={`/account/exercise/exam/${child.id}`}>mode examen</Link>
                  </div>
                ))
              
            }   
          </>
        }
      </div>
      }
    </div>}
   </>
  )
}
export default Account