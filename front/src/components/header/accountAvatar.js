import React, { useState }from 'react'
import { Link, useNavigate }from 'react-router-dom'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";


const AccountAvatar = ({ isConnect, connected }) => {
  const [display, setDisplay] = useState(false)


  const nav = useNavigate()

  const disconect = () => {
    window.localStorage.removeItem('token')
    isConnect(false)
    nav('/')
  }
  return (
    <div className="header__avatar">
     <div className="header__avatar--icoDiv" onClick={() => setDisplay(!display)}>
      <FontAwesomeIcon icon={faUser} className="header__avatar--ico" />
     </div>
     {(display && connected) && 
      <>
        <Link to ="/account/home" className="header__avatar--link"> mon compte</Link>
        <div className="header__avatar--link" onClick={() => disconect()}> deconnection</div>
      </>
     }
      {(display && !connected) && 
      <>
        <Link to ="/" className="header__avatar--link"> crée un compte /<br/>me connecter</Link>
      </>
     }
    
    </div>
  )
 }
 export default AccountAvatar