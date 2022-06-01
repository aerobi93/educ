import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../container/form/input";

import {faUnlockKeyhole} from "@fortawesome/free-solid-svg-icons";

const Connexion = ({password, role, status,  loading, sendFormConnexion, changeLoading}) => {
  const [passwordError, setPasswordError] = useState()
  const [typeError, setTypeError] = useState()
  const navigate = useNavigate()
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
  useEffect(() => {
    console.log(status, 'test')
    if (status !== 200) {
      navigate(status)
    }
    else if (role === "parent") {
      navigate('/interface/parent')
    }
    else if (role ===' student') {
      navigate('/interface/student')
    }
  }, [status])
 
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
        <button className="form__submit">connection</button>
      </form>
      }
      
    </>
  
  )
}
export default Connexion