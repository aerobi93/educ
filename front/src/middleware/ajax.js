import axios from 'axios';
import { SEND_FORM_CONNEXION,  SEND_FORM_REGISTER } from '../action';

const ajax = (store) => (next) => (action) =>  {
  const state = store.getState();
  axios.defaults.baseURL ='http://localhost:8000'
  switch (action.type) {
    case SEND_FORM_CONNEXION : 
    axios.post('/login', {
      email: state.email,
      password: state.password
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        return e
      });
    break;
      
    case SEND_FORM_REGISTER : 
    axios.post('/user/adduser', {
      email: state.email,
      birthday: new Date(state.birthday),
      role: state.role,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        return e
      });
    break;


    default: next(action)
  }
}

export default ajax