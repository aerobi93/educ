import { connect } from "react-redux";
import Result from "../../components/account/result";

import { changeValue, changeDisplay, getCategories, sentAskPassword, deleteChild, changeLoading } from "../../action";

const mapStateToProps = (state) => ({
  childId : state.childId,
  displayResultExercices : state.displayResultExercices,
  displayResultExam : state.displayResultExam,
  allCategories : state.allCategories,
  askLogin : state.askLogin,
  widthWindow : state.widthWindow
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
  deleteChild : () => {
    dispatch(deleteChild())
  },
  changeLoading : () => {
    dispatch(changeLoading())
  }
})

export default connect(mapStateToProps, mapDispatchtoProps)(Result)