import React, { useEffect, useState } from "react";
import './styles.scss'

import { Link } from "react-router-dom"



import AccountAvatar from "../../container/header/accountAvatar";
import Trigram from "../../container/header/trigram";

const Header = ({ widthWindow , displayTrigram}) => {
console.log(widthWindow)
  return (
    <div className="header">
      <Link to="/" className="header__title"> {widthWindow <= 800 && <Trigram />}  studies</Link> 
      <span className="header__descript">pour apprendre tous en s'amusant</span>
      { widthWindow > 800 && <AccountAvatar />}
    </div>
  )
}
  
export default Header
