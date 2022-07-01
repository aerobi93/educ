import React from "react"
import './styles.scss'

import { useNavigate } from "react-router"
const Error403 = () => {
  const nav = useNavigate()
  setTimeout(() => {
    nav('/')
  }, 1000 * 10)
  return   (
    <div className="error"> vous n' avez pas les autorisation requise pour cette page veuillez vous connecter, 
    <br />vous aller être rediriger dans quelques seconde</div>
    )
}
export default Error403