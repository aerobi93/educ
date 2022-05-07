import React, { useState, useEffect} from "react";
import Input from "../../container/form/input";

import {faUnlockKeyhole} from "@fortawesome/free-solid-svg-icons";

const Connexion = ({password, sendFormConnexion, changeLoading, loading}) => {
  const [passwordError, setPasswordError] = useState()
  const [typeError, setTypeError] = useState()

  const handlerSubmit = (evt) => {
    evt.preventDefault();
    if (password.trim ==='') {
      setTypeError(true)
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