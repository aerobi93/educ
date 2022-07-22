import React from "react";
import './styles.scss'

import { Link } from "react-router-dom"



import AccountAvatar from "../../container/header/accountAvatar";

const Header = () => (
  <div className="header">
    <Link to="/" className="header__title"> studies</Link> 
    <span className="header__descript">pour apprendre tous en s'amusant</span>
    <AccountAvatar />
  </div>
)
export default Header
