import { CHANGE_VALUE, CHANGE_ERROR_FIELDS, CHANGE_LOADING} from "../action"

const initialState = {
  password: "",
  email:"",
  birthday:"",
  role:"",
  errorFields: false,
  loading: false
}

const reducer = (state = initialState, action = {})  => {
  switch (action.type) {
    case CHANGE_VALUE :
      return {
        ...state,
        [action.name] : action.value
      };
    case CHANGE_ERROR_FIELDS : 
      return {
        ...state,
        errorFields : true
      }
      case CHANGE_LOADING : 
      return {
        ...state,
       loading : !state.loading
      }

  default: 
    return {
      ...state
    }
  }
}
export default reducer