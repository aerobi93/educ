import React, {useState} from "react";
import Input from "../../container/form/input";

import { faUserPlus, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";

const Connexion = ({pseudo, password }) => {
  return (
    <form className="form__connexion">
    <Input ico={faUserPlus} id={"pseudo"} value={pseudo}  type={"text"}  placeholder={"login"} />
    <Input ico={faUnlockKeyhole} id={"password"} value={password} placeholder={"mot de passe"}  type={"password"} />
    <button className="form__submit">connection</button>
    </form>
  )
}
export default Connexion