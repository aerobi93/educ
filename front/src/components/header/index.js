import React from "react";
import './styles.scss'



import AccountAvatar from "../../container/header/accountAvatar";

const Header = () => (
  <div className="header">
    <h1 className="header__title"> studies</h1> 
    <span className="header__descript">pour apprendre tous en s'amusant</span>
    <AccountAvatar />
  </div>
)
export default Header
