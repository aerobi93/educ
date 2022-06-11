import axios from 'axios';
import { COUNT, SEND_FORM_CONNEXION,  SEND_FORM_REGISTER, changeLoading, changeMessageRequest, emptyFields, VALIDATION_CODE, SENT_NEW_LINK, UPDATE_USER, FIND_ALL_DATA, setAllData } from '../action';

const ajax = (store) => (next) => (action) =>  {
  let token = window.localStorage.getItem('token')
  axios.defaults.baseURL ='http://localhost:5000'
  axios.defaults.headers.common = {
    "type" : 'JWT, json/application',
    "token": `${token}`,
  };
  
  switch (action.type) {
    case COUNT : {
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
    }
    break;
        
    case SEND_FORM_CONNEXION : { 
      axios.post('/login', {
        email:  store.getState().email,
        password:  store.getState().password
      })
      .then((response) => {
        let {token, message, role} = response.data 
        store.dispatch(emptyFields())
        window.localStorage.setItem('token', token)
        store.dispatch(changeMessageRequest(message, response.request.status, role))
        store.dispatch(changeLoading())
      })
      .catch((err) => {
        store.dispatch(changeMessageRequest(err.request.response, err.request.status))
        store.dispatch(changeLoading())
      });
    }
    break;
      
    case SEND_FORM_REGISTER : {
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
    }
    break;

    case VALIDATION_CODE: {
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
    }
    break;

    case SENT_NEW_LINK: {

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
    }
    break

    case UPDATE_USER:  {
      const data= {}
      let token = window.localStorage.getItem('token')

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
    }
   
    break;
    case FIND_ALL_DATA: {
      let token = window.localStorage.getItem('token')
      token = JSON.stringify(token)
      axios.get('/user/findAll')
      .then((response) => {
       
        console.log(response.data.message)
      })
      .catch((err) => {
        store.dispatch(changeMessageRequest(err.request))
      })

    }
    
      
    default: next(action)
  }
}
export default ajax