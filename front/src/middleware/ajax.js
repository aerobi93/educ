import axios from 'axios';
import { SEND_FORM_CONNEXION,  SEND_FORM_REGISTER, CHANGE_VALIDATION, changeLoading, changeMessageRequest, emptyFields, SENT_NEW_VALIDATION_CODE } from '../action';

const ajax = (store) => (next) => (action) =>  {
  axios.defaults.baseURL ='http://localhost:9000'
  switch (action.type) {
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
      window.localStorage.setItem('token', response)
      store.dispatch(changeLoading())
      console.log(response)
    })
    .catch((e)=> {
      store.dispatch(changeLoading())
      return e
    });
    break;
    case SENT_NEW_VALIDATION_CODE:
      axios.patch('/user/newValidationCode', {
        email : store.getState().email
      })
      .then((response) => {
        
      })
      .catch((err) => {
      })
    default: next(action)
  }
}

export default ajax