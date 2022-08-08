import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router";
import InputPassword from "../../container/form/inputPassword";

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
    if (password.trim() == '') {
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
       <InputPassword passwordError={passwordError} password = {password}/>
        <button className="form__submit">enregistrer</button>
      </form>
      }
      
    </>
  
  )
}
export default ChangePassword