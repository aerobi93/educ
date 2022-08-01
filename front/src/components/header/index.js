import React, { useEffect, useState } from "react";
import './styles.scss'

import { Link } from "react-router-dom"



import AccountAvatar from "../../container/header/accountAvatar";
import Trigram from "../../container/header/trigram";

const Header = ({ widthWindow , displayTrigram}) => {

  return (
    <div className="header">
      <Link to="/" className={ displayTrigram ? "header__title header__title--80" : "header__title"}> studies</Link> 
      <span className="header__descript">pour apprendre tous en s'amusant</span>
      { widthWindow > 800 && <AccountAvatar />}
      {widthWindow <= 800 && <Trigram />}
    </div>
  )
}
  
export default Header
