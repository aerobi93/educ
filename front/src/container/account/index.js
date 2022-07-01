import { connect } from "react-redux";
import Account from "../../components/account";

import { changeLoading, findAllData, sendFormRegisterChildren } from "../../action"

const mapStatetoProps = (state) => ({
 role : state.role,
 data : state.data,
 birthday: state.birthday,
 message : state.messageRequest,
 name : state.name,
 displayResult : state.displayResult,
 displayAddChild : state.displayAddChild
})

const mapDispatchtoProps = (dispatch) => ({
  changeLoading : () => {
    dispatch(changeLoading())
  },
  sendFormRegister : () => {
    dispatch(sendFormRegisterChildren())
  },
})

export default connect(mapStatetoProps, mapDispatchtoProps)(Account)