import axios from 'axios';
import { COUNT, SEND_FORM_CONNEXION,  SEND_FORM_REGISTER, CHANGE_VALIDATION, changeLoading, changeMessageRequest, emptyFields, SENT_NEW_VALIDATION_CODE, PASSWORD_FORGOTTEN } from '../action';

const ajax = (store) => (next) => (action) =>  {
  axios.defaults.baseURL ='http://localhost:9000'
  switch (action.type) {
    case COUNT : 
      axios.post('/user/count', {
        email: store.getState().email
        })
        .then((response) => {
          store.dispatch(changeMessageRequest(response.data))
          store.dispatch(changeLoading())
        })
        .catch((err) => {
          store.dispatch(changeLoading())
        })
    break;
        
    case SEND_FORM_CONNEXION : 
    axios.post('/login', {
      email:  store.getState().email,
      password:  store.getState().password
      })
      .then((response) => {
        window.localStorage.setItem('token', response)
        store.dispatch(changeLoading())
        store.dispatch(emptyFields())
      })
      .catch((err) => {
        store.dispatch(changeMessageRequest(err.request.response))
        store.dispatch(changeLoading())
      });
    break;
      
    case SEND_FORM_REGISTER : 
    axios.post('/user/adduser', {
        email:  store.getState().email,
        password :  store.getState().password,
        birthday: new Date(store.getState().birthday),
        role:  store.getState().role,
      })
      .then((response) => {
        store.dispatch(changeMessageRequest(response.data))
        store.dispatch(changeLoading())
        store.dispatch(emptyFields())
      })
      .catch((err) => {
        store.dispatch(changeMessageRequest(err.request.response))
        store.dispatch(changeLoading())
      });
    break;

    case CHANGE_VALIDATION: 
    axios.post('/user/validation', {
      validate: action.value
    })
    .then((response) => {
     
      window.localStorage.setItem('token', response.data)
      store.dispatch(changeLoading())
      store.dispatch(changeMessageRequest('valid'))
    })
    .catch((e)=> {
      store.dispatch(changeMessageRequest(e.request.response))
    });
    break;
    case SENT_NEW_VALIDATION_CODE:
      axios.patch('/user/newValidationCode', {
        email : store.getState().email
      })
      .then((response) => {
        store.dispatch(changeMessageRequest(response.data))
      })
      .catch((err) => {
        store.dispatch(changeMessageRequest(err.request.response))
      })
    case PASSWORD_FORGOTTEN : 
      axios.post('/user/passwordForgotten', {
        email : action.value
      })
    default: next(action)
  }
}

export default ajax