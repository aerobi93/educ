import { connect } from "react-redux";
import Register from "../../components/form/register";
import { changeValue } from "../../action";

const mapStateToProps = (state) => ({
  pseudo: state.pseudo,
  email: state.email
})

const mapDispatchToProps =(dispatch) => ({
  changeValue : (value, role) => {
    dispatch(changeValue(value, role))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)