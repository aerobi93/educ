import react , {useEffect, useState} from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"

import Menu from "../../container/account/menu"

const Trigram = ({ isConnect, connected, displayTrigram, changeDisplay }) => {

  const nav = useNavigate()
  const location = useLocation()
  const disconect = () => {
    window.localStorage.removeItem('token')
    isConnect(false)
    nav('/')
  }

  return (
    <div className="header__trigram--flex">
    <div className="header__trigram" onClick={() => changeDisplay("displayTrigram", !displayTrigram)}/>
    {(displayTrigram && connected) && 
      <>
        <Link to ="/account/home" className="header__trigram--link"> mon compte</Link>
        <div className="header__trigram--link" onClick={() => disconect()}> deconnection</div>
      </>
     }
      {(displayTrigram  && !connected) && 
        <Link to ="/" className="header__trigram--link"> crée un compte /<br/>me connecter</Link>
      }
      
      {(displayTrigram  && location.pathname == "/account/home") && <Menu />}
    </div>
    
    
  )
}
export default Trigram