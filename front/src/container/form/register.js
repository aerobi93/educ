import { connect } from "react-redux";
import Register from "../../components/form/register";
import { changeValue, sendFormRegister, changeLoading } from "../../action";

const mapStateToProps = (state) => ({
  password: state.password,
  birthday: state.birthday,
  role: state.role,
  loading: state.loading,
  email : state.email
})

const mapDispatchToProps =(dispatch) => ({
  changeValue : (value, role) => {
    dispatch(changeValue(value, role))
  },
  sendFormRegister : () => {
    dispatch(sendFormRegister())
  },
  changeLoading : () => {
    dispatch(changeLoading())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)