
import { CHANGE_VALUE, CHANGE_LOADING, CHANGE_MESSAGE_REQUEST, EMPTY_FIELDS, SET_ALL_DATA, SET_ROLE, CHANGE_DISPLAY, IS_CONNECT} from "../action"

const initialState = {
  password: "",
  email:"",
  birthday:"",
  name: "",
  role:"",
  data : "",
  messageRequest:"",
  statusRequest:"",
  loading: false,
  connected : false,
  displayResult : false,
  displayAddChild : false
}

const reducer = (state = initialState, action = {})  => {
 
  switch (action.type) {
    case CHANGE_VALUE :
      return {
        ...state,
        [action.name] : action.value
      };
    case CHANGE_LOADING : 
      return {
        ...state,
       loading : !state.loading
      }
    case CHANGE_MESSAGE_REQUEST: {
      return {
        ...state,
        messageRequest: action.value,
        statusRequest : action.status,
        role: action.role,
      }}
    case EMPTY_FIELDS: 
      return {
        ...state, 
        password: "",
        email:"",
        birthday:"",
        name : "",
        role:"",
        messageRequest:"",
        statusRequest:"",
      }
    case SET_ROLE :
      return {
        ...state,
        role : action.value
      }
    case SET_ALL_DATA : 
      return {
        ...state,
        data: action.data
      }
    case CHANGE_DISPLAY : 
      return {
        ...state,
        [action.name] : action.value
      }
    case IS_CONNECT : {
      return {
        ...state,
        connected : action.value
      }
    }
  default: 
    return {
      ...state
    }
  }
}
export default reducer