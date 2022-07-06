import axios from 'axios';
import { COUNT, SEND_FORM_CONNEXION,  SEND_FORM_REGISTER, SEND_FORM_REGISTER_CHILDREN, changeLoading, changeMessageRequest, emptyFields, VALIDATION_CODE, SENT_NEW_LINK, UPDATE_USER, FIND_ALL_DATA, DELETE_USER, setAllData, setRole, isConnect, SAVE_RESULT} from '../action';
import Delete from '../components/account/delete';

const ajax = (store) => (next) => (action) =>  {
  let token = window.localStorage.getItem('token')
  axios.defaults.baseURL ='http://localhost:7000'
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

    case SEND_FORM_REGISTER_CHILDREN: {
      axios.post('/user/adduserChild', {
        birthday: new Date(store.getState().birthday),
        name:  store.getState().nameChild,
        role: "student"
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
        let {token, message} = response.data
        window.localStorage.setItem('token', token)
        store.dispatch(changeMessageRequest(message, response.status))
        store.dispatch(isConnect(true))
        store.dispatch(changeLoading())
      })
      .catch((err)=> {
        store.dispatch(changeMessageRequest(err.request.response))
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
      axios.patch('/user/update', {
        password : store.getState().password,
         email : store.getState().email
      })
      .then((response) => {
        store.dispatch(changeMessageRequest(response.data))
        store.dispatch(isConnect(true))
        store.dispatch(emptyFields())
        store.dispatch(changeLoading())
      })
      .catch((err) => {
        store.dispatch(changeMessageRequest(err.request.response))
        store.dispatch(emptyFields())
        store.dispatch(changeLoading())
      })
    }
   
    break;
    case FIND_ALL_DATA: {
      axios.get('/user/findAll')
      .then((response) => {
        store.dispatch(setAllData(response.data.message))
        store.dispatch(setRole(response.data.role))
        store.dispatch(changeLoading())
      })
      .catch((err) => {
        store.dispatch(changeMessageRequest(err.request.message))
        store.dispatch(changeLoading())
      })

    }
    break;
    
    case DELETE_USER : {
      axios.delete("/user/delete")
      .then((response) => {
        store.dispatch(changeMessageRequest(response.data))
      })
      
    }
    break
    
    case SAVE_RESULT : {
      console.log("axios save result")
    }
    default: next(action)
  }
}
export default ajax