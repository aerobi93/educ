import { CHANGE_VALUE, CHANGE_ERROR_FIELDS} from "../action"

const initialState = {
  password: "",
  email:"",
  birthday:"",
  role:"",
  errorFields: false

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

  default: 
    return {
      ...state
    }
  }
}
export default reducer