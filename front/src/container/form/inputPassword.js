import { connect } from "react-redux";
import InputPassword from "../../components/form/inputPassword";

const mapStateToProps = (state) => ({
  password: state.password
})
const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(InputPassword)