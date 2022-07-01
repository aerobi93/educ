import React from "react"
import './styles.scss'
import { useNavigate } from "react-router"

const Error404 = () =>  {
 const nav = useNavigate()
  setTimeout(() => {
    nav('/')
  }, 1000 * 10)
  return (
    <div className="error"> cette page n' existe pas, 
    <br/>vous aller être rediriger dans quelques seconde</div>
  )
}
export default Error404