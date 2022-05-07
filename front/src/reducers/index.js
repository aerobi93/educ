import { CHANGE_VALUE, CHANGE_ERROR_FIELDS, CHANGE_LOADING, CHANGE_MESSAGE_REQUEST, EMPTY_FIELDS} from "../action"

const initialState = {
  password: "",
  email:"",
  birthday:"",
  role:"",
  messageRequest:"",
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
        messageRequest: action.value
      }}
    case EMPTY_FIELDS: 
      return {
        ...state, 
        password: "",
        email:"",
        birthday:"",
        role:"",
      }

  default: 
    return {
      ...state
    }
  }
}
export default reducer