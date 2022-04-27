import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({ ico, id, value, placeholder, type, changeValue }) => (
  <div className="form__flexInput"> 
  <label className="form__label" for={id} > {placeholder} </label>
    <div className="form__cardIco">
      <FontAwesomeIcon icon={ico} className="form__ico" />
    </div>
    <input 
      className="form__input" 
      type={type} name={id} 
      id={id} value={value} 
      placeholder={placeholder} 
      onChange={(evt) => changeValue(evt.target.value)}
    /> 
    
  </div>

)

export default Input