import { CHANGE_VALUE } from "../action"

const initialState = {
  pseudo: "",
  password: "",
  email:"",
  birthday:"",
  role:""

}

const reducer = (state = initialState, action = {})  => {
  switch (action.type) {
    case CHANGE_VALUE :
      return {
        ...state,
        [action.name] : action.value
      };

  default: 
    return {
      ...state
    }
  }
}
export default reducer