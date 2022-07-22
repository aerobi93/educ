import { connect } from "react-redux";
import Account from "../../components/account";

import { sentNewLink, changeLoading, sendFormRegisterChildren, changeDisplay, findAllData, data, role, sentAskPassword, sendFormConnexion, changeValue ,changeMessageRequest } from "../../action"

const mapStatetoProps = (state) => ({
 role : state.role,
 data : state.data,
 birthday: state.birthday,
 message : state.messageRequest,
 nameChild : state.nameChild,
 displayResult : state.displayResult,
 displayAddChild : state.displayAddChild,
 messageAjax : state.messageRequest,
 askLogin : state.askLogin,
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
  },
  sendFormConnexion : (value) => {
    dispatch(sendFormConnexion(value))
  },
  sentAskPassword : (value) => {
    dispatch(sentAskPassword(value))
  },
  changeMessageRequest : (value) => {
    dispatch(changeMessageRequest(value))
  },
  changeValue : (value, name) => {
    dispatch(changeValue(value, name))
  },
  sentNewLink : (value) => {
    dispatch(sentNewLink(value))
  },
})

export default connect(mapStatetoProps, mapDispatchtoProps)(Account)