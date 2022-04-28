import { connect } from "react-redux";
import Register from "../../components/form/register";
import { changeValue, changeErrorFields, sendFormRegister } from "../../action";

const mapStateToProps = (state) => ({
  email: state.email, 
  birthday: state.birthday,
  role: state.role,
  errorFields: state.errorFields
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)