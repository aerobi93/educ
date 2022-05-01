import { connect } from "react-redux";
import Register from "../../components/form/register";
import { changeValue, changeErrorFields, sendFormRegister, changeLoading } from "../../action";

const mapStateToProps = (state) => ({
  email: state.email, 
  password: state.password,
  birthday: state.birthday,
  role: state.role,
  errorFields: state.errorFields,
})

const mapDispatchToProps =(dispatch) => ({
  changeValue : (value, role) => {
    dispatch(changeValue(value, role))
  },
  changeErrorFields : () => {
    dispatch(changeErrorFields())
  }, 
  sendFormRegister : () => {
    dispatch(sendFormRegister())
  },
  changeLoading : () => {
    dispatch(changeLoading())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)