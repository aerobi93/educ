import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

const Delete = ( { deleteAccount }) => {
  console.log('composant delete')
  const nav = useNavigate()
  useEffect(() => {
    deleteAccount()
    window.localStorage.removeItem('token')
    nav("/")
  }, [])
}
export default Delete