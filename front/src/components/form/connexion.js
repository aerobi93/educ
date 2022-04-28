import React, { useState, useEffect} from "react";
import Input from "../../container/form/input";

import { faUserPlus, faUnlockKeyhole} from "@fortawesome/free-solid-svg-icons";

const Connexion = ({email, password, sendFormConnexion, changeErrorFields }) => {
  const handlerSubmit = (evt) => {
    evt.preventDefault();
    if (!email, !password) {
      changeErrorFields()
    }
    else if (email.indexOf('@') <= 0 && email.indexOf('.') <= 0) {
      alert("l'email doit contenir obligatoirement un @ et un .")
    }
    else if (typeof password !== 'string' ) {
      alert ('mot de passe non valide')
    }
    else sendFormConnexion()
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