import React  from "react"
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
    <div className="header__trigram">
      <div className="header__trigram--logo" onClick={() => changeDisplay("displayTrigram", !displayTrigram)}/>
      <div className="header__trigram--flex" >
      {(displayTrigram && connected) && 
        <>
          <Link to ="/account/home" className="header__trigram--link"  onClick={()=> changeDisplay("displayTrigram", !displayTrigram)}> mon compte</Link>
          <div className="header__trigram--link" onClick={() => {
            disconect()
            changeDisplay("displayTrigram", !displayTrigram)
            }}> deconnection</div>
        </>
      }
        {(displayTrigram  && !connected) && 
        <>
          <Link to ="/" className="header__trigram--link" onClick={()=> changeDisplay("displayTrigram", !displayTrigram)}> crée un compte </Link> 
          <Link to ="/" className="header__trigram--link"  onClick={()=> changeDisplay("displayTrigram", !displayTrigram)}> me connecter </Link> 
        </>
         
        
        }
        
        {(displayTrigram  && location.pathname == "/account/home") && <Menu />}
      </div>
    </div>
    
    
  )
}
export default Trigram