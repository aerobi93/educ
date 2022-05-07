import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.scss";
import Spinner from "../loader/spin";



const ForgotPassword = ({loading, messageRequest, changeLoading, passwordForgotten }) => {
  const params = useParams() 

  useEffect(() => {
    changeLoading()
    passwordForgotten(params.id)
  })


  return (
    <div className="forgot">
    {messageRequest && <div className="forgot__message"></div>}
    {loading && <Spinner />}
    </div>
  )


}
export default ForgotPassword