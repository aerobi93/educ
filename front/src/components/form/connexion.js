import React, { useState, useEffect} from "react";
import Input from "../../container/form/input";

import { faUserPlus, faUnlockKeyhole} from "@fortawesome/free-solid-svg-icons";

const Connexion = ({email, password, sendFormConnexion, changeErrorFields, changeLoading }) => {
  const handlerSubmit = (evt) => {
    evt.preventDefault();
    let regexMail = /[^\s]+[@]+[\w]\w*[.]\w*/g
    
    if (!email, !password) {
      changeErrorFields()
    }
    else if (!email.match(regexMail)) {
      alert("email non conforme")
    }
    else if (typeof password !== 'string' ) {
      alert ('mot de passe non valide')
    }
    else {
      changeLoading()
      sendFormConnexion()
    }
  }
 
  return (
    <form className="form__connexion" onSubmit={(evt) => handlerSubmit(evt)}>
    <Input 
      ico={faUserPlus}
      id={"email"} value={email}
      type={"text"} 
      placeholder={"email"}
    />
    <Input ico={faUnlockKeyhole} id={"password"} value={password} placeholder={"mot de passe"}  type={"password"}/>
    <button className="form__submit">connection</button>
    </form>
  )
}
export default Connexion