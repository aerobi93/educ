import { connect } from "react-redux";
import ChangeEmail from "../../components/form/email";
import { updateUser, changeLoading } from "../../action";

const mapStateToProps = (state) => ({
    email : state.email,
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmail)