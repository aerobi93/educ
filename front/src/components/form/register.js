import React, {useState, useEffect} from "react";


import Input from '../../container/form/input';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCakeCandles, faUserNinja, faUnlockKeyhole, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { getAge } from "../../utils";

const Register = ({ password, changeValue, birthday, role, sendFormRegister, changeLoading, loading}) => {  
  const [error, setError] = useState()
  const [openEyes, setOpenEyes] = useState()
  const [passwordError, setPassordError] = useState()
  const [roleError, setRoleError] = useState()
  const [birthdaydError, setBirthdayError] = useState()
  const [errorToDisplay, setErrorToDisplay] = useState()

  
  useEffect(()=> {
    if (password !=='') { setPassordError(false)}
    if (role !=='') { setRoleError(false)}
    if (birthday !=='') { setBirthdayError(false)}
  },[password, role, birthday] )


  const handlerSubmit = (evt) => {
    evt.preventDefault()
    if(password.trim() == "") {setPassordError(true)}
    else if(!password.match(/[A-Z]+[a-z]+[0-9]/g)) {
      setErrorToDisplay(true)
      setTimeout(() => {
        setErrorToDisplay(false)
      }, 1000 * 4)
      return
    }
    if(birthday.trim() == "") {setBirthdayError(true)}
    if(role.trim() == "") {setRoleError(true)}

    if ( role === 'parent' && getAge(birthday) < 18) {
      setError('le role de parent necessite d avoir 18ans revolue')
    }
    else if(role === 'student' && getAge(birthday) <= 12) {
      setError("tu n'a pas l'age passe par le compte de tes parents")
    }
    else if (birthdaydError == false && roleError == false && passwordError == false) {
      setError()
      changeLoading()
      sendFormRegister() 
    }
  }

  return (
    <>
   {!loading && <form className="form__register" onSubmit={(evt)=> handlerSubmit(evt)}>

        {errorToDisplay && <div className="form__messagError">
          le mot de passe doit obligatoirement contenir : <br/>
          Une majuscule, Une minuscule et Un chiffre
         </div>}   
        <div className="form__eyes" onMouseDown={() => setOpenEyes(!openEyes)} onMouseUp={() => setOpenEyes(!openEyes)} >
          { openEyes &&  <FontAwesomeIcon icon={faEye} className="form__ico" />}
          { !openEyes &&  <FontAwesomeIcon icon={faEyeSlash} className="form__ico" />}
        </div>
      <Input 
        ico={faUnlockKeyhole}
        id={"password"}
        value={password}
        type={openEyes ? 'text' : 'password'}
        placeholder={"mot de passe"} 
        className={ passwordError ? "form__input form__input--red" : "form__input" }
      />
      
      <Input 
        ico={faCakeCandles}
        id={"birthday"}
        value={birthday}
        className={ birthdaydError ? "form__input form__input--red" : "form__input" }
        type={"date"}
        placeholder={"date de naissance"} 
      />

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