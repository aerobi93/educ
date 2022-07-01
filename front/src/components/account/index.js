import React,  { useEffect, useState }from "react";
import {faUser, faCakeCandles} from "@fortawesome/free-solid-svg-icons";

import './styles.scss'

import Input from "../../container/form/input";
import Menu from "../../container/account/menu";
import Spinner from "../loader/spin";



const Account = ({ displayAddChild, displayResult, data }) => {
 

  return (
    <>
    {data &&  <div className="account">
      <Menu />
      <div className="account__container"></div>
    </div>}
   </>
  )
}
export default Account