import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faEnvelope, faCakeCandles, faUserNinja } from "@fortawesome/free-solid-svg-icons";
import Input from '../../container/form/input';
import { getAge } from "../../store/utils";

const Register = ({ email, changeValue, birthday, role, errorFields, sendFormRegister, changeErrorFields }) => {  

  const handlerSubmit = (evt) => {
    evt.preventDefault()
    if (!email.trim() || !birthday.trim() || !role.trim()) {
      changeErrorFields()
    }
    else if (email.indexOf('@') <= 0 ||  email.indexOf('.') <= 0) {
      alert("l'email doit contenir obligatoirement un @ et un .")
    }
    else if ( role === 'parent' && getAge(birthday) < 18) {
      alert('le role de parent necessite d avoir 18ans revolue')
    }
    else if(role === 'student' && getAge(birthday) <= 12) {
      alert("tu n'a pas l'age passe par le compte de tes parents")
    }
    else sendFormRegister()
  }
 
  return (
    <form className="form__register" onSubmit={(evt)=> handlerSubmit(evt)}>
      <Input ico={faEnvelope} id={"email"} value={email}  type={"text"}  placeholder={"email"} />
      <Input ico={faCakeCandles} id={"birthday"} value={birthday}  type={"date"}  placeholder={"date de naissance"} />

      <div className="form__flexInput"> 
    <label className="form__label" htmlFor="role" >role</label>
      <div className="form__cardIco">
        <FontAwesomeIcon icon={faUserNinja} className="form__ico" />
      </div>
      <select className={(errorFields && !role ) ? "form__input form__input--red" : "form__input" } id="role" onChange={(evt) => changeValue(evt.target.value, "role")}>
        <option value=''>role</option>
        <option value="parent">parent</option>
        <option value="student">etudiant</option>
      </select>
      </div>
      <button className="form__submit">inscription</button>
    </form>
  )
}

export default Register