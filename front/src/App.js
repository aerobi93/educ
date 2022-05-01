import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import './styles/index.scss'
import Header from './components/header';
import Footer from './components/footer';
import FormConnection from './container/form';
import Validation from './container/validation';


function App() {
  return (
    <div className="app">
      <Header />
      <div className="app__center">
        <Routes>
          <Route exact path='/' element={ <FormConnection /> } />
          <Route path='/validation/:id' element={ <Validation /> } />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
export default App;
