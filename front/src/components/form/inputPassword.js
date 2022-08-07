 import React, {useState} from "react"
 import Input from '../../container/form/input';

 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockKeyhole, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

 const InputPassword  = ({passwordError, password}) => {

  const [openEyes, setOpenEyes] = useState()
  return (
    <>
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
    </>
  )
}
 export default InputPassword