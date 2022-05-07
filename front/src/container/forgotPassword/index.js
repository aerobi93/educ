import{ connect }from "react-redux";
import ForgotPassword from "../../components/validation";
import { changeLoading, passwordForgotten } from "../../action"

const mapStatetoProps = (state) => ({
  loading: state.loading,
  messageRequest: state.messageRequest
})

const mapDispatchtoProps = (dispatch) => ({
  changeLoading : () => {
    dispatch(changeLoading())
  },
  passwordForgotten : (value) => {
    dispatch(passwordForgotten(value))
  }
})

export default connect(mapStatetoProps, mapDispatchtoProps)(ForgotPassword)