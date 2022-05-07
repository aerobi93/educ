import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.scss";
import Spinner from "../loader/spin";

const Validation = ({ loading, messageRequest, changeLoading, changeValidation }) => {
  const navigation = useNavigate()
  const params = useParams() 
  let now = new Date()
  now = Math.floor(now.getTime()/1000)
  let cut = params.id.split('&')
 useEffect(() => {
   if (now > +cut[1] + (60 * 15)) {
    navigation('/')
  }
  if (messageRequest !== "valid") {
    setTimeout(() => {navigation('/')}, 1000 * 5)
  }
 })
  console.log(messageRequest, "message")
  useEffect(() => {
    changeLoading()
    changeValidation(params.id)
  }, [params.id])

  return (
    <>
    {(messageRequest !=='valid'  && messageRequest)
      && <div className="validation__message">{messageRequest}</div>}
      {loading && 
        <div className="validation">
          <h2 className="validation__title"> Validation en cour</h2>
          <div className="validation__loader">
             <Spinner />
          </div>
       
        </div>
      }
    </>
  )
}
export default Validation