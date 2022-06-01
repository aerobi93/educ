import { CHANGE_VALUE, CHANGE_LOADING, CHANGE_MESSAGE_REQUEST, EMPTY_FIELDS} from "../action"

const initialState = {
  password: "",
  email:"",
  birthday:"",
  role:"",
  messageRequest:"",
  statusRequest:"",
  loading: false
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
        role:"",
        messageRequest:"",
        statusRequest:"",
        role:""
      }

  default: 
    return {
      ...state
    }
  }
}
export default reducer