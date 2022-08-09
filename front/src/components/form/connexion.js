import React, { useState, useEffect} from "react";
import InputPassword from '../../container/form/inputPassword'
import { useLocation, useNavigate } from 'react-router-dom'


const Connexion = ({password,  loading, sendFormConnexion, changeLoading, email, messageAjax}) => {
  const [passwordError, setPasswordError] = useState()
  const [messsageError, setMessageError] = useState()
  const link = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    if(link.pathname.includes("form/connexion") && email=="") {
      nav("/")
    }
  }, [])

  useEffect(() => {
    if(password.trim() !== "") {
      setPasswordError(false)
    }
  }, [password])
  const handlerSubmit = (evt) => {
    evt.preventDefault();
    if (password.trim() ==='') {
      setPasswordError(true)
    }
    else if (typeof password !== 'string' ) {
     setPasswordError(true)
    }
    else {
      changeLoading()
      sendFormConnexion()
    }
  }

  return (
    <> 
      {
      !loading &&
      <form className="form__connexion" onSubmit={(evt) => handlerSubmit(evt)}>
       <InputPassword  passwordError = {passwordError} password = {password}/>
        <button className="form__submit">connection</button>
      </form>
      }
      
    </>
  
  )
}
export default Connexion