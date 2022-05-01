import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './styles.scss'

import Connexion from '../../container/form/connexion'
import Register from "../../container/form/register";
import Spinner from "../loader/spin";

const Form = ( { loading, message, changeMessageRequest, sentNewValidationCode }) => {
  const [typeForm, setTypeForm] = useState('connexion')

  if(message){
    if (message !== 'compte non validé' )
    {
      setTimeout(()=> {
        changeMessageRequest('')
      }, 1000 * 5)
    }
  }
  return (
    <div className="form">

      <div className="form__flexTitle">
        <div className="form__title form__title--left" onClick={()=> setTypeForm('connexion')}>connection</div>
        <div className="form__title form__title--left"onClick={() => setTypeForm('register')}>inscription</div>
      </div>
      {message && <div className="form__message"> {message} </div>}
      {message == 'compte non validé' && 
        <button className="form__sendNewCode" onClick={() => sentNewValidationCode()}>
          cliquer ici pour <br/> envoyer un nouveau mail de valiation 
        </button>}
      {loading && <div className="form__loading"><Spinner /></div>}
     { (typeForm === 'connexion'&& !message && !loading) && <Connexion /> }
     { (typeForm === 'register'&& !message && !loading) && <Register /> }
    </div>
  )
}

export default Form