import React,  { useEffect, useState }from "react";
import { Link } from 'react-router-dom'
import {faUser, faCakeCandles} from "@fortawesome/free-solid-svg-icons";
import { encode } from "base-64";

import './styles.scss'

import Input from "../../container/form/input";
import Menu from "../../container/account/menu";
import Result from "./result";
import Spinner from "../loader/spin";

import { getAge } from "../../utils";


const Account = ({ role, loading, changeLoading,changeDisplay, displayAddChild, displayResult, data, nameChild,birthday, sendFormRegisterChildren, messageAjax, findAllData }) => {
  const [error, setError] = useState()
  const [nameChildError, setNameChildError] = useState()
  const [birthdaydError, setBirthdayError] = useState()
  useEffect(() => {
    changeLoading()
    findAllData()
    changeDisplay("displayAddChild", false)
    changeDisplay("displayResult", true)
  }, [messageAjax])
 

  useEffect(()=> {
    if (nameChild !=='') { setNameChildError(false)}
    if (birthday !=='') { setBirthdayError(false)}
  },[nameChild,  birthday] )

  const handlerSubmit = (evt) => {
    evt.preventDefault()
    if(birthday.trim() == "") {setBirthdayError(true)}
    if(nameChild.trim() == "") {setNameChildError(true)}

    else if(getAge(birthday) >= 18) {
      setError("les personnes agées de 18ans ou plus doivent créé un compte avec un role  etudiant d' eux meme")
      setTimeout(() => {
        setError()
      }, 1000 * 3)
      return
    }
    else {
      setError()
      changeLoading()
      sendFormRegisterChildren() 
    }
  }


  return (
    <>
    {loading &&  <div className="account__loading"><Spinner /></div>}
    {error  &&  <div className="account__errorText">{error}</div>}
    {(data && !error && !loading)  &&  
    <div className="account">
      <Menu />
      <div className="account__container">
        {displayAddChild && 
          <form className="account__form" onSubmit={(evt)=> handlerSubmit(evt)}>
            
            <Input 
              ico={faUser}
              id={"nameChild"}
              value={nameChild}
              type={"text"}
              placeholder={"nom de l enfant"} 
              className={ nameChildError ? "form__input form__input--red" : "form__input" }
            />

            <Input 
              ico={faCakeCandles}
              id={"birthday"}
              value={birthday}
              className={ birthdaydError ? "form__input form__input--red" : "form__input" }
              type={"date"}
              placeholder={"date de naissance"} 
          />
             <button className="form__submit">enregistrer</button>
          </form>
        }
        { displayResult && 
          <>
            {
              role === "student" ? 
              (
                <div className="account__result--flex">
                  <Result data ={data} role = {role} /> 
                  <Link className= "account__result--link" to='/account/exercise/simulation'>s'entrainer</Link>
                  <Link className= "account__result--link" to='/account/exercise/exam'>mode examen</Link>
                </div>
              ):
                data.student.map((child) => (
                  <div  className="account__result--flex" key = {child.name}>
                    <Result data ={child} role = {role} /> 
                    <Link className= "account__result--link" to={`/account/exercise/simulation/${encode(child.name)}`}>s'entrainer</Link>
                    <Link className= "account__result--link" to={`/account/exercise/exam/${encode(child.name)}`}>mode examen</Link>
                  </div>
                ))
              
            }   
          </>
        }
      </div>
    </div>}
   </>
  )
}
export default Account