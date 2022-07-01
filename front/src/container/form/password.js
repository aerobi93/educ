import { connect } from "react-redux";
import ChangePassword from "../../components/form/password";
import { updateUser, changeLoading } from "../../action";

const mapStateToProps = (state) => ({
  password: state.password,
  loading: state.loading
})

const mapDispatchToProps =(dispatch) => ({
    updateUser : () => {
    dispatch(updateUser())
  },
  changeLoading : () => {
    dispatch(changeLoading())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)