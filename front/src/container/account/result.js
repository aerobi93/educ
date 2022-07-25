import { connect } from "react-redux";
import Result from "../../components/account/result";

import { changeValue, changeDisplay, getCategories, sentAskPassword } from "../../action";

const mapStateToProps = (state) => ({
  childId : state.childId,
  displayResultExercices : state.displayResultExercices,
  allCategories : state.allCategories,
  askLogin : state.askLogin
})
const mapDispatchtoProps = (dispatch) => ({
  changeValue :(value, name) => {
    dispatch(changeValue(value, name))
  },
  changeDisplay : (name , value) => {
    dispatch(changeDisplay(name, value))
  },
  getCategories : () => {
    dispatch(getCategories())
  },
  sentAskPassword : (value) => {
    dispatch(sentAskPassword(value))
  },
})

export default connect(mapStateToProps, mapDispatchtoProps)(Result)