import React, {useEffect, useState} from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';

import './index.scss'

import Header from '../../container/header';
import Footer from '../footer';
import FormConnection from '../../container/form';
import Validation from '../../container/validation';
import Account from '../../container/account';
import Error403 from '../error/403'
import Error404 from '../error/404'
import Delete from '../../container/account/delete';

import Interface from '../../container/interface';



const App =  ({messageAjax,  changeMessageRequest,  status, isConnect, setWidthWindow, sentNewLink , auth, connected, changeLoading}) => {
  const navigate = useNavigate()
  const link  = useLocation()

  const [stateConnect, setStateConnect] = useState()
  useEffect(() => {
    setStateConnect(connected)
  }, [connected, link, messageAjax])

  // auth is async function so he send a promise
  useEffect(() => {
   
    auth()
  }, [connected, link.pathname])


  useEffect(() => {
    if (messageAjax === 'utilisateur trouver') { 
      changeMessageRequest("")
      navigate('/form/connexion')}
    else if (messageAjax === 'aucun utilisateur') { 
      
      navigate('/form/register')}

    else if (link.pathname.includes("connexion") && messageAjax === "connexion ok"){
      auth()
      navigate('/')
   }
   else if(messageAjax === "validation ok" && status == 200){
    if(link.pathname.includes("passwordForgotten")) {navigate('/form/password')}
    if(link.pathname.includes("validation/validation")) {navigate('/account/home')}
    if(link.pathname.includes("delete")) {navigate('/account/delete')}
  }
  else if (messageAjax.includes("un email") && messageAjax.includes("a ete envoyer")) {
    localStorage.removeItem("token")
    isConnect(false)
    navigate("/")
  }
  }, [messageAjax]) 


  useEffect(() => {
    setWidthWindow()
  }, [window.innerWidth] )
  
  return (
    
    <div className="app">
     <Header />
      {
       ( messageAjax.includes("un email") && messageAjax.includes("a ete envoyer")) && 
        <div className='app__center'> 
          <div className='app__message'>{messageAjax}</div> 
        </div>
      }
      {
        messageAjax == 'compte non valider' && 
        <div className='app__center'> 
          <button className="app__message" onClick={() => sentNewLink('validation')}>
            cliquer ici pour <br/> envoyer un nouveau mail de validation 
          </button>
        </div>
      }
      {
        (!messageAjax.includes("un email") && !messageAjax.includes("a ete envoyer") && messageAjax !== "compte non valider") &&  
        <div className="app__center">
         
         {( stateConnect === true || stateConnect === false) && 
      <Routes  > 

      <Route exact path='/' element={stateConnect?  <Navigate replace to="/account/home" /> : <FormConnection />} />
      <Route exact path='/form/:typeForm' element={ <FormConnection /> } />
      <Route exact path='/validation/:type/:token' element={ <Validation /> } />
      <Route exact path='/form/changeEmail'  element={stateConnect ? <FormConnection />  : <Navigate replace to="/403" /> } />
      <Route exact path='/403' element={<Error403 /> } /> 
      <Route exact path='/account/home' element={stateConnect ? <Account />  :   <Navigate replace to="/403" />} />
      <Route exact path='/account/delete' element={<Delete /> } />
      <Route exact path='/account/exercise/:type' element={stateConnect ? <Interface /> : <Navigate replace to="/403" />}/>
      <Route  path='/404' element={<Error404 /> } /> 
      <Route  path='*' element={<Navigate replace to="/404" /> } />
     
    </Routes>}
          
      </div>
      }
      <Footer />
    </div>
  );

}
export default App;
