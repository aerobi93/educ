import axios from 'axios';
import { COUNT, SEND_FORM_CONNEXION,  SEND_FORM_REGISTER, changeLoading, changeMessageRequest, emptyFields, VALIDATION_CODE, SENT_NEW_LINK, UPDATE_USER } from '../action';

const ajax = (store) => (next) => (action) =>  {
  axios.defaults.baseURL ='http://localhost:12000'
  switch (action.type) {
    case COUNT : 
      axios.post('/user/count', {
        email: store.getState().email
      })
      .then((response) => {
        store.dispatch(changeMessageRequest(response.data, response.status))
        store.dispatch(changeLoading())
      })
      .catch((err) => {
        store.dispatch(changeMessageRequest(err.request.response, err.request.status))
        store.dispatch(changeLoading())
      })
    break;
        
    case SEND_FORM_CONNEXION : 
      axios.post('/login', {
        email:  store.getState().email,
        password:  store.getState().password
      })
      .then((response) => {
        let {token, role} = response.data 
        store.dispatch(emptyFields())
        window.localStorage.setItem('token', token)
        store.dispatch(changeMessageRequest(role))
        store.dispatch(changeLoading())
       
      })
      .catch((err) => {
        store.dispatch(changeMessageRequest(err.request.response, err.request.status))
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
        store.dispatch(emptyFields())
        store.dispatch(changeMessageRequest(response.data))
        store.dispatch(changeLoading())
        
      })
      .catch((err) => {
        store.dispatch(changeMessageRequest(err.request.response))
        store.dispatch(changeLoading())
      });
    break;

    case VALIDATION_CODE: 
    axios.post('/user/validation', {
      validate: action.value,
    })
    .then((response) => {
      let {token, role, message} = response.data
      window.localStorage.setItem('token', token)
      store.dispatch(changeMessageRequest(message, response.status, role))
      store.dispatch(changeLoading())
    })
    .catch((e)=> {
      store.dispatch(changeMessageRequest(e.request.response))
      store.dispatch(changeLoading())
      
    });
    break;

    case SENT_NEW_LINK:

      axios.patch('/user/newCode', {
        email : store.getState().email,
        type : action.value
      })
      .then((response) => {
        store.dispatch(changeMessageRequest(response.data))
        store.dispatch(emptyFields())
      })
      .catch((err) => {
        store.dispatch(changeMessageRequest(err.request.response))
        store.dispatch(emptyFields())
      })
    break

    case UPDATE_USER: 
    let data= {}
    const token = window.localStorage.getItem('token')

    let password  = store.getState().password
    let email = store.getState().email
      if (password !== '') { data = {...data, password }}
      if (email !== '') { data = {...data, email }}
      axios.patch('/user/update', {
        data
      }, {headers : token})
      .then((response) => {
        store.dispatch(changeMessageRequest(response.data))
        store.dispatch(emptyFields())
      })
      .catch((err) => {
        store.dispatch(changeMessageRequest(err.request.response))
        store.dispatch(emptyFields())
      })
    break;
    default: next(action)
  }
}
export default ajax