import { connect } from "react-redux";
import Account from "../../components/account";

import { changeLoading, sendFormRegisterChildren, changeDisplay, findAllData, data, role } from "../../action"

const mapStatetoProps = (state) => ({
 role : state.role,
 data : state.data,
 birthday: state.birthday,
 message : state.messageRequest,
 nameChild : state.nameChild,
 displayResult : state.displayResult,
 displayAddChild : state.displayAddChild,
 messageAjax : state.messageRequest
})

const mapDispatchtoProps = (dispatch) => ({
  changeLoading : () => {
    dispatch(changeLoading())
  },
  sendFormRegisterChildren : () => {
    dispatch(sendFormRegisterChildren())
  },
  changeDisplay : (name, value) => {
    dispatch(changeDisplay(name, value))
  },
  findAllData : () => {
    dispatch(findAllData())
  }
})

export default connect(mapStatetoProps, mapDispatchtoProps)(Account)