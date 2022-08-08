import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router";
import Input from "../../container/form/input";

import {faUser} from "@fortawesome/free-solid-svg-icons";

const ChangeEmail = ({email,  loading, updateUser, changeLoading}) => {
  const [emailError, setEmailError] = useState()
  const [typeError, setTypeError] = useState()
  const nav  = useNavigate()  
  let regexMail = /[^\s]+[@]+[\w]\w*[.]\w*/g
  
  useEffect(() => {
    if(email.trim() !== "") {
      setTypeError()
    }
  }, [email])
  
  
  const handlerSubmit = (evt) => {
    evt.preventDefault();
    if (email.trim() ==='') {
      setTypeError('email')
    }
    else if (typeof email !== 'string' && !email.match(regexMail)) {
     setEmailError('mail non conforme')
     setTypeError('email')
    }
    else {
      changeLoading()
      updateUser()    
    }
  }

  return (
    <> 
      {emailError && <div className="form_message">{emailError}</div>}
      {
      !loading &&
      <form className="form__connexion" onSubmit={(evt) => handlerSubmit(evt)}>
        <Input 
        ico={faUser} 
        id={"email"}
        value={email}
        placeholder={"email"}
        type={"email"}
        className={typeError== 'email' ? 'form__input form__input--red' : 'form__input'}
        />
        <button className="form__submit"> enregistrer</button>
      </form>
      }
      
    </>
  
  )
}
export default ChangeEmail