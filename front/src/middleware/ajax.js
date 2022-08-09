import axios from 'axios';
import { COUNT, SEND_FORM_CONNEXION,  SEND_FORM_REGISTER, SEND_FORM_REGISTER_CHILDREN, AUTH, changeLoading, changeMessageRequest, emptyFields, VALIDATION_CODE, SENT_NEW_LINK, UPDATE_USER, FIND_ALL_DATA, DELETE_USER, setAllData, setRole, isConnect, SAVE_RESULT, getCategories, GET_CATEGORIES, setCategories, changeDisplay, DELETE_CHILD, changeValue, auth} from '../action';


const ajax = (store) => (next) => (action) =>  {
  let token = window.localStorage.getItem('token')
  axios.defaults.baseURL ='https://studies-back.herokuapp.com/'
  axios.defaults.headers.common = {
    "token": `${token}`,
  };
  

  const promiseAjax = (params) => {
    params
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        store.dispatch(isConnect(true))
      }
      if(response.statusText.includes("data trouver")) {
        store.dispatch(setAllData(response.data))
      }
      store.dispatch(changeMessageRequest(response.statusText, response.status))
      store.dispatch(changeLoading())
    })
    .catch((err) => {

      store.dispatch(changeMessageRequest(err.request.statusText, err.request.status))
      store.dispatch(changeLoading())
    })
  }

  switch (action.type) {
    case COUNT : 
    let countAJax  =  axios.post('/user/count', {
      email: store.getState().email
    })
    promiseAjax(countAJax)
    break;
    
    case SEND_FORM_REGISTER : 
      let registerAxios = axios.post('/user/adduser', {
        email:  store.getState().email,
        password :  store.getState().password,
        birthday: new Date(store.getState().birthday),
        role:  store.getState().role,
      })
      promiseAjax(registerAxios)
      registerAxios.then(() => {
        store.dispatch(emptyFields())
      })
    break;  
    
    case VALIDATION_CODE: 
     let validationAxios =  axios.post('/user/validation', {
      authorization : action.value,
      typeAsk : action.typeAsk
      })
      promiseAjax(validationAxios)
    break;

    case SEND_FORM_CONNEXION : 
     let axiosConnection  =  axios.post('/login', {
        email:  store.getState().email,
        password:  store.getState().password
      })
      promiseAjax(axiosConnection)
      axiosConnection.then((response) =>{
        if(response.statusText !== "compte non valider") {
          store.dispatch(emptyFields())
        }
      })
    break;
    
    case AUTH : 
    if(!localStorage.getItem("token")) {return}
      axios.get("/token/verifyToken")
      .then((response) => {
        if(response.statusText === "logged") {
          store.dispatch(isConnect(true))
        }
        else if (response.statusText === " nologged"){
          store.dispatch(isConnect(false))
          localStorage.removeItem("token")
        }
      })
      .catch((err) => {
        if(err.status === 401) {
             store.dispatch(isConnect(false))
        localStorage.removeItem("token")
        }
      })
    break 
    case SEND_FORM_REGISTER_CHILDREN: {
      axios.post('/user/adduserChild', {
        birthday: new Date(store.getState().birthday),
        name:  store.getState().nameChild,
        role: "student"
      })
      .then((response) => {
        store.dispatch(emptyFields())
        store.dispatch(changeMessageRequest(response.data))
        store.dispatch(changeDisplay("displayResult", true))
        store.dispatch(changeDisplay("displayAddChild", false))
        store.dispatch(changeLoading())
      })
      .catch((err) => {
        store.dispatch(changeMessageRequest(err.request.response))
        store.dispatch(changeLoading())
      });
    }
    break;

   

    case SENT_NEW_LINK: {
      let newLinkAxios = axios.patch('/user/newCode', {
        email : store.getState().email,
        type : action.value
      })
      promiseAjax(newLinkAxios)
    }
    break

    case UPDATE_USER:  {
      let updateAxios = axios.patch('/user/update', {
         password : store.getState().password,
         email : store.getState().email
      })
     promiseAjax(updateAxios)
     store.dispatch(emptyFields())
    }
   
    break;
    case FIND_ALL_DATA: {
      let findAllAxios = axios.get('/user/findAll')
      promiseAjax(findAllAxios)

    }
    break;
    
    case DELETE_USER : {
      let deleteAxios =axios.delete("/user/delete")
      promiseAjax(deleteAxios)
      deleteAxios.then((response) => {
        store.dispatch(isConnect(false))
      })
      
    }
    break
    
    case SAVE_RESULT : {
      axios.post("/results/add", {
        exam : action.exam ,
        note: action.note,
        timeRest : action.timerest, 
        userID : store.getState().childId, 
        contentName : action.category,
      })
      .then((response) => {
      })
      .catch((err) => {
      })
    }
    break

    case GET_CATEGORIES :{
      axios.get("/content/findAll")
      .then((response) => {
        store.dispatch(setCategories(response.data))
        store.dispatch(changeLoading())
      })
      .catch((e) => {
        store.dispatch(changeLoading())
      })
    }
    break

    case DELETE_CHILD : {
      axios.post("/user/deleteChild", {id : store.getState().childId})
      .then((response) => {
        store.dispatch((changeLoading()))
        store.dispatch(changeMessageRequest(response.data,response.status))
        store.dispatch(changeValue("", "childId"))
      }) 
      .catch((err) => {
        changeLoading()
        store.dispatch(changeMessageRequest(err.request.response,err.request.status))
      })
    }
    break

    default: next(action)
  }
  
}
export default ajax