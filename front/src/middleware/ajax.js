import axios from 'axios';
import { SEND_FORM_CONNEXION,  SEND_FORM_REGISTER, CHANGE_VALIDATION } from '../action';

const ajax = (store) => (next) => (action) =>  {
  const state = store.getState();
  axios.defaults.baseURL ='http://localhost:9000'
  switch (action.type) {
    case SEND_FORM_CONNEXION : 
    axios.post('/login', {
      email: state.email,
      password: state.password
      })
      .then((response) => {
        
      })
      .catch((err) => {
        return err
      });
    break;
      
    case SEND_FORM_REGISTER : 
    axios.post('/user/adduser', {
        email: state.email,
        password : state.password,
        birthday: new Date(state.birthday),
        role: state.role,
      })
      .then((response) => {
        
      })
      .catch((e) => {
        return e
      });
    break;

    case CHANGE_VALIDATION: 
    axios.post('/user/validation', {
      validate: action.value
    })
    .then((response) => {
      
    })
    .catch((e)=> {
      return e
    });
    break;
    



    default: next(action)
  }
}

export default ajax