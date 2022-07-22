import React, {useEffect, useState} from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';

import './index.scss'

import Header from '../header';
import Footer from '../footer';
import FormConnection from '../../container/form';
import Validation from '../../container/validation';
import Account from '../../container/account';
import Error403 from '../error/403'
import Error404 from '../error/404'
import Delete from '../../container/account/delete';

import { auth } from '../../utils';
import Interface from '../../container/interface';



const App =  ({ student, messageAjax, status, loading, changeLoading, findAllData, isConnect }) => {
  const navigate = useNavigate()
  const params = useParams()
  const link  = useLocation()
  const [authenticate, setAuthentificate] = useState()
  // auth is async function so he send a promise
  const changeAuth = async() => {
    setAuthentificate(await auth())
    if (await auth() === 'logged') {
      changeLoading()
      isConnect(true)
      findAllData()
    }

  }

  useEffect(() => {
    if (messageAjax === 'utilisateur trouvé') { navigate('/form/connexion')}
    else if (messageAjax === 'aucun utilisateur') { navigate('/form/register')}
    else if (status === 401 && !link.pathname.includes('form') && !link.pathname.includes("account/home")) {navigate('/401')}
    else if (status === 403 ) {navigate('/403')}
    
    else if(messageAjax === "validate" && status == 200){
      if(link.pathname.includes("passwordForgotten")) {navigate('/form/password')}
      if(link.pathname.includes("validation")) {navigate('/account/home')}
      if(link.pathname.includes("delete")) {navigate('/account/delete')}
    }
    else if (link.pathname.includes("connexion") && messageAjax === "connexion ok"){
      changeAuth()
      navigate('/')
    }
    //redirection if user key in params no found
    if(link.pathname.includes("account/exercise/")) {
      let split = link.pathname.split(/[/]/g)
     if(!student) {navigate('/403'); return}
      let countId = student.filter((element) => element.id == split[split.length - 1]).length
      if(countId && countId > 0) {navigate('/403'); return }
    }
  }, [messageAjax]) 

  useEffect(() => {changeAuth()}, [link.pathname])
  return (
    
    <div className="app">
      <Header />
      <div className="app__center">
        { authenticate && 
    
          <Routes  > 
            <Route exact path='/' element={authenticate === "logged" ?  <Navigate replace to="/account/home" /> : <FormConnection />} />
            <Route exact path='/form/:typeForm' element={ <FormConnection /> } />
            <Route exact path='/validation/:id' element={ <Validation /> } />
            <Route exact path='/passwordForgotten/:id' element={ <Validation /> } />
            <Route  path='/delete/:id' element={  <Validation />} />
            <Route exact path='/form/changeEmail'  element={authenticate === "logged" ? <FormConnection />  : <Navigate replace to="/403" /> } />
            <Route exact path='/403' element={<Error403 /> } /> 
            <Route exact path='/account/home' element={authenticate === "logged" ? <Account /> :   <Navigate replace to="/403" />} />
            <Route exact path='/account/delete' element={<Delete /> } />
            <Route exact path='/account/exercise/:type/:id' element={authenticate === "logged" ? <Interface /> : <Navigate replace to="/403" />}/>
          
            <Route  path='/404' element={<Error404 /> } /> 
            <Route  path='*' element={<Navigate replace to="/404" /> } />
          </Routes>
}
      </div>
      <Footer />
    </div>
  );

}
export default App;
