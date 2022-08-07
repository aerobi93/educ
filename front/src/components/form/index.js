import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import './styles.scss'

import Connexion from '../../container/form/connexion'
import Register from "../../container/form/register";
import Password from "../../container/form/password";
import ChangeEmail from "../../container/form/email";
import Input from '../../container/form/input';

import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../loader/spin";

const Form = ({ message, status, email, loading, count, changeLoading, sentNewLink }) => {
  const [messageError, setMessageError] = useState(String)
  const [typeError, setTypeError] = useState(String)
  let typeForm = useParams().typeForm
  let regexMail = /[^\s]+[@]+[\w]\w*[.]\w*/g

  useEffect(() => {
    if(email.trim() !== "" ){
      setTypeError(false)
    }
  }, [email])


  const Submit = async (evt) => {
    evt.preventDefault()
    if (!email) {
      setTypeError("email")
    }
    else if (!email.match(regexMail)) {
      setMessageError("email non conforme")
    }
    else {
      setMessageError()
      changeLoading()
      count()
      
    }
  }
  return (
    <div className="form">
        
          <div className="form__flexTitle">
            {
              typeForm != '' && 
              <div className="form__title">
                {typeForm =="changeMail" ? "modifier mon email" : "connection/insciption" }
              </div>
            }
          </div>
      {message !== "" && message !== "Unauthorized" && status !== 200  && <div className="form__message"> {message} </div>} 
      { messageError && <div className="form__message">{messageError}</div>}
      { 
        message =='erreur de mot de passe' && 
        <button className="form__passwordForgotten" onClick={() => {
          changeLoading()
          sentNewLink('passwordForgotten')
        }}
          >
            mot de passe oublier
          </button> 
      }
      
      {loading && <div className="form__loading"><Spinner /></div>}
      { !loading && 
        <>
        { typeForm=== 'connexion' && message !== "nouveau lien envoyer par mail" &&<Connexion /> }
        { typeForm === 'register' && <Register /> }
        { typeForm === 'password' && <Password /> }
        { typeForm === 'changeMail' && <ChangeEmail /> }

        {!typeForm  && 
          <form onSubmit={(evt)=> Submit(evt)}>
            <Input 
              ico={faEnvelope}
              id={"email"} value={email} 
              type={"text"}  
              placeholder={"email"} 
              className={typeError== 'email' ? 'form__input form__input--red' : 'form__input'} />
            <button className="form__submit">envoyer</button>
          </form>
        }
        </>
      }
  
  
      
    </div>
  )
}

export default Form