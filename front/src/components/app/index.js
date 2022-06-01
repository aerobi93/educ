import React, {useEffect} from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import './index.scss'

import Header from '../header';
import Footer from '../footer';
import FormConnection from '../../container/form';
import Validation from '../../container/validation';
import Home from '../../container/home';

const App = ({ messageAjax, status, role }) => {
  const navigate = useNavigate()
  const link = useLocation()
  
  useEffect(() => {
    if (messageAjax === 'utilisateur trouvé') { navigate('/form/connexion')}
    else if (messageAjax === 'aucun utilisateur') { navigate('/form/register')}
    else if (status === 401 && !link.pathname.includes('form') ) {navigate('/401')}
    else if (status === 403 ) {navigate('/403')}
    
    else if(messageAjax === "valider" && status == 200){
      if(link.pathname.includes("passwordForgotten")) {navigate('/form/password')}
      if(link.pathname.includes("validation")) {
        if(role === "parent") {navigate('/home/parent')}
        else if(role === "student") {navigate('/home/student')}
      }

      
    }

  }, [messageAjax])
 
  return (
    <div className="app">
      <Header />
      <div className="app__center">
        <Routes>      
          <Route exact path='/' element={ <FormConnection /> } />
          <Route exact path='/form/:typeForm' element={ <FormConnection /> } />
          <Route exact path='/validation/:id' element={ <Validation /> } />
          <Route exact path='/passwordForgotten/:id' element={ <Validation /> } />
          <Route exact path='/home/:id' element={ <Home /> } />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
export default App;
