import { connect } from "react-redux";
import Result from "../../components/account/result";

import { changeValue, changeDisplay, getCategories } from "../../action";

const mapStateToProps = (state) => ({
  childId : state.childId,
  displayResultExercices : state.displayResultExercices,
  allCategories : state.allCategories,
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
})

export default connect(mapStateToProps, mapDispatchtoProps)(Result)