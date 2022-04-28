import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({ ico, id, value, placeholder, type, errorFields, changeValue }) => {console.log(errorFields) 
  return (
  <div className="form__flexInput"> 
  <label className="form__label" htmlFor={id} > {placeholder} </label>
    <div className="form__cardIco">
      <FontAwesomeIcon icon={ico} className="form__ico" />
    </div>
    <input 
      className={(errorFields && !value ) ? "form__input form__input--red" : "form__input"   }
      type={type} name={id} 
      id={id} value={value} 
      placeholder={placeholder} 
      onChange={(evt) => changeValue(evt.target.value)}
    /> 
    
  </div>

)}

export default Input