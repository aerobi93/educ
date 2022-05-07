import React, {useState} from "react";
import './styles.scss'

import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import Connexion from '../../container/form/connexion'
import Register from "../../container/form/register";
import Spinner from "../loader/spin";
import Input from '../../container/form/input';

const Form = ( {email, changeLoading, loading, count,  message, sentNewValidationCode, passwordForgotten }) => {
  const [forgotPassword, setforgotPassword] = useState(false)
  const [messageError, setMessageError] = useState(String)
  const [typeError, setTypeError] = useState(String)
  let regexMail = /[^\s]+[@]+[\w]\w*[.]\w*/g

  const Submit = (evt) => {
   
    evt.preventDefault()
    if (!email) {
      setTypeError("email")
    }
    else if (!email.match(regexMail)) {
      setMessageError("email non conforme")
    }
    else {
      changeLoading()
      count()
    }
  }
   
  return (
    <div className="form">
      <div className="form__flexTitle">
        {!forgotPassword &&<div className="form__title">connection/insciption</div>}
        {forgotPassword &&<div className="form__title">mot de passe oublier</div>}
      </div>
      {typeof message == 'String'  && <div className="form__message"> {message} </div>} 
      { 
        message =='erreur de mot de passe' && 
        <button className="form__passwordForgotten" onClick={() => passwordForgotten()}>mot de passe oublier</button> 
      }
      {
      message == 'compte non validé' && 
        <button className="form__sendNewCode" onClick={() => sentNewValidationCode()}>
          cliquer ici pour <br/> envoyer un nouveau mail de valiation 
        </button>
      }
      {loading && <div className="form__loading"><Spinner /></div>}
      { message === 1 && <Connexion /> }
      { message === 0 && <Register /> }
      { messageError && <div className="form__message">{messageError}</div>}
      { message === 'un mail de confirmation a été envoyer' && <div className="form__message">{message}</div>}
     
       {
       (!loading  && message !== 'un mail de confirmation a été envoyer' && typeof message !== 'number')  && 
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
     
    </div>
  )
}

export default Form