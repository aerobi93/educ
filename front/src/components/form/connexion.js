import React, { useState, useEffect} from "react";
import InputPassword from '../../container/form/inputPassword'
import { useLocation, useNavigate } from 'react-router-dom'


const Connexion = ({password,  loading, sendFormConnexion, changeLoading, email, messageAjax}) => {
  const [passwordError, setPasswordError] = useState()
  const [typeError, setTypeError] = useState()
  const link = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    if(link.pathname.includes("form/connexion") && email=="") {
      nav("/")
    }
  }, [])

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
    }
    else {
      changeLoading()
      sendFormConnexion()
    }
  }

  return (
    <> 
      {passwordError && <div className="form_message">{passwordError}</div>}
      {
      !loading &&
      <form className="form__connexion" onSubmit={(evt) => handlerSubmit(evt)}>
       <InputPassword />
        <button className="form__submit">connection</button>
      </form>
      }
      
    </>
  
  )
}
export default Connexion