import React, {useState} from "react";
import './styles.scss'

import Connexion from '../../container/form/connexion'
import Register from "../../container/form/register";

const Form = () => {
  const [typeForm, setTypeForm] = useState('connexion')
  return (
    <div className="form">
      <div className="form__flexTitle">
        <div className="form__title form__title--left" onClick={()=> setTypeForm('connexion')}>connection</div>
        <div className="form__title form__title--left"onClick={() => setTypeForm('register')}>inscription</div>
      </div>
     { typeForm === 'connexion' && <Connexion /> }
     { typeForm === 'register' && <Register /> }
    </div>
  )
}

export default Form