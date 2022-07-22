import { useNavigate, Link } from "react-router-dom"



const Menu = ({ role, changeDisplay, displayAddChild, displayResult, sentAskPassword, childId }) => {
  
  const nav = useNavigate()

  const handlerClick = ( value) => {
   let text = "etes vous sur de vouloir"
   if(value == "password") { text +=  " " + "modifier votre mot de passe"}
   if(value == "email") { text += " " + "modifier votre email"}
   if(value == "delete") { text += " " + "supprime votre compte"}
   
   let confirm = window.confirm(text )
   if(!confirm) {return}
   if (value === "password"  || value === "delete"&& confirm) {
    if (value === "password"){
      sentAskPassword("password")
    }
    else if(value === "delete"){
      sentAskPassword("delete")
    }
   
   }
   
   if (value === "email" && confirm) {
    sentAskPassword("changeEmail")
   }

  }
  const handlerDisplay = () => {
    if(displayAddChild == true ) {
      changeDisplay("displayAddChild",  !displayAddChild)
      changeDisplay("displayResult",  !displayResult)
    }
    else sentAskPassword("changeDisplay")
  }

  return(
    <div className="account__menu">
      {childId &&  <Link className= "account__menu--link  account__menu--red" to={`/account/exercise/simulation`}>s'entrainer</Link>}
      {childId &&  <Link className= "account__menu--link  account__menu--red" to={`/account/exercise/exam`}>mode examen</Link>}


      { role === "parent" &&  <div className="account__menu--link" onClick={() => handlerDisplay()}>
        ajouter un compte enfant
      </div> }
  
      <div className="account__menu--link" onClick={() => handlerClick("delete")}>
        suprimmer mon compte
      </div>
      <div className="account__menu--link" onClick={() => handlerClick("password")}>
        modifier mon mot de passe
      </div>
      <div className="account__menu--link" onClick={() => handlerClick("email")}>
        modifier mon email
      </div>
    </div>
  )
}
export default Menu