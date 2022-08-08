import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

const Delete = ( { deleteUser, changeLoading }) => {
  const nav = useNavigate()

  useEffect(() => {
    changeLoading()
    deleteUser()
    window.localStorage.removeItem('token')
    nav("/")
  }, [])
}
export default Delete