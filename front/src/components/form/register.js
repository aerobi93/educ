import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faEnvelope, faCakeCandles, faUserNinja } from "@fortawesome/free-solid-svg-icons";
import Input from '../../container/form/input'

const Register = ({ pseudo, email, changeValue }) => (
  <form className="form__register">
    <Input ico={faUserPlus} id={"pseudo"} value={pseudo}  type={"text"}  placeholder={"login"} />
    <Input ico={faEnvelope} id={"email"} value={email}  type={"text"}  placeholder={"email"} />
    <Input ico={faCakeCandles} id={"birthday"}  type={"date"}  placeholder={"date de naissance"} />

    <div className="form__flexInput"> 
  <label className="form__label" for="role" >role</label>
    <div className="form__cardIco">
      <FontAwesomeIcon icon={faUserNinja} className="form__ico" />
    </div>
    <select className="form__select" id="role" onChange={(evt) => changeValue(evt.target.value, "role")}>
      <option value="">role</option>
      <option value="parent">parent</option>
      <option value="student">etudiant</option>
    </select>
    </div>
  </form>
)

export default Register