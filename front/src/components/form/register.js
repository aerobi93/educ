import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCakeCandles, faUserNinja, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import Input from '../../container/form/input';
import { getAge } from "../../store/utils";

const Register = ({ password, changeValue, birthday, role, sendFormRegister, changeLoading, loading}) => {  
  const [error, setError] = useState()
  const [passwordError, setPassordError] = useState()
  const [roleError, setRoleError] = useState()
  const [birthdaydError, setBirthdayError] = useState()

  useEffect(()=> {
    if (password !=='') { setPassordError(false)}
    if (role !=='') { setRoleError(false)}
    if (birthday !=='') { setBirthdayError(false)}
  },[password, role, birthday] )


  const handlerSubmit = (evt) => {
    evt.preventDefault()
    if(password.trim() == "") {setPassordError(true)}
    if(birthday.trim() == "") {setBirthdayError(true)}
    if(role.trim() == "") {setRoleError(true)}

    if ( role === 'parent' && getAge(birthday) < 18) {
      setError('le role de parent necessite d avoir 18ans revolue')
    }
    else if(role === 'student' && getAge(birthday) <= 12) {
      setError("tu n'a pas l'age passe par le compte de tes parents")
    }
    else if (birthdaydError == false && roleError == false && passwordError == false) {
     changeLoading()
     sendFormRegister() 
     console.log('test');
    }
  }
 
  return (
    <>
   {error && <div className="form__message"> {error} </div>}
   {!loading && <form className="form__register" onSubmit={(evt)=> handlerSubmit(evt)}>
      <Input 
        ico={faUnlockKeyhole}
        id={"password"}
        value={password}
        type={"password"}
        placeholder={"mot de passe"} 
        className={ passwordError ? "form__input form__input--red" : "form__input" }
      />
      <Input 
        ico={faCakeCandles}
        id={"birthday"}
        value={birthday}
        className={ birthdaydError ? "form__input form__input--red" : "form__input" } type={"date"}  placeholder={"date de naissance"} />

      <div className="form__flexInput"> 
    <label className="form__label" htmlFor="role" >role</label>
      <div className="form__cardIco">
        <FontAwesomeIcon icon={faUserNinja} className="form__ico" />
      </div>
      <select 
        className={ roleError ? "form__input form__input--red" : "form__input" } 
        id="role" 
        onChange={(evt) => changeValue(evt.target.value, "role")}
      >
        <option value=''>role</option>
        <option value="parent">parent</option>
        <option value="student">etudiant</option>
      </select>
      </div>
      <button className="form__submit">inscription</button>
    </form>
   }
    
    </>
  )
}

export default Register