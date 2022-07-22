import { connect } from "react-redux";
import Menu from "../../components/account/menu";

import { changeDisplay, sentAskPassword, } from "../../action";

const mapStatetoProps = (state) => ({
 role : state.role,
 displayResult : state.displayResult,
 displayAddChild : state.displayAddChild,
 askLogin : state.askLogin
})

const mapDispatchtoProps = (dispatch) => ({
  changeDisplay : (name, value) => {
    dispatch(changeDisplay(name, value))
  },
  sentAskPassword : (value) => {
    dispatch(sentAskPassword(value))
  },

})

export default connect(mapStatetoProps, mapDispatchtoProps)(Menu)