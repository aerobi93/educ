import React from "react";
import './styles.scss'

import { Link } from "react-router-dom"



import AccountAvatar from "../../container/header/accountAvatar";
import Trigram from "../../container/header/trigram";

const Header = ({ widthWindow}) => {
console.log(widthWindow)
  return (
    <div className="header">
      <div className="header__title">
        {widthWindow <= 800 && <Trigram />}
        <Link to="/" className="header__title--title">studies</Link>
      </div>
      <span className="header__descript">pour apprendre tous en s'amusant</span>
      { widthWindow > 800 && <AccountAvatar />}
    </div>
  )
}
  
export default Header
