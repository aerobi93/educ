import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router";
import Input from "../../container/form/input";

import {faUnlockKeyhole} from "@fortawesome/free-solid-svg-icons";

const ChangePassword = ({password,  loading, updateUser, changeLoading}) => {
  const [passwordError, setPasswordError] = useState()
  const [typeError, setTypeError] = useState()
  const nav  = useNavigate()  

  useEffect(() => {
    if(password.trim() !== "") {
      setTypeError()
    }
  }, [password])
  const handlerSubmit = (evt) => {
    evt.preventDefault();
    if (password.trim() ==='') {
      setTypeError('password')
    }
    else if (typeof password !== 'string' ) {
     setPasswordError('mot de passe non conforme')
     setTypeError('password')
    }
    else if (!password.match(/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/g)) {
      setTypeError("password")
      setPasswordError("le mot de passe doit obligatoirement contenir  Majuscule, 1 minuscule, 1 chiffre et un caractere special, et un minimum de 10 caractéres")
    }
    else {
      changeLoading()
      updateUser()
      nav("/")
      
    }
  }

  return (
    <> 
      {passwordError && <div className="form_message">{passwordError}</div>}
      {
      !loading &&
      <form className="form__connexion" onSubmit={(evt) => handlerSubmit(evt)}>
        <Input 
        ico={faUnlockKeyhole} 
        id={"password"}
        value={password}
        placeholder={"mot de passe"}
        type={"password"}
        className={typeError== 'password' ? 'form__input form__input--red' : 'form__input'}
        />
        <button className="form__submit">enregistrer</button>
      </form>
      }
      
    </>
  
  )
}
export default ChangePassword