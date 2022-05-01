import{ connect }from "react-redux";
import Validation from "../../components/validation";
import { changeValidation, changeLoading } from "../../action"

const mapStatetoProps = (state) => ({
  loading: state.loading,
  messageRequest: state.messageRequest
})

const mapDispatchtoProps = (dispatch) => ({
  changeValidation : (value) => {
    dispatch(changeValidation(value))
  },
  changeLoading : () => {
    dispatch(changeLoading())
  }
})

export default connect(mapStatetoProps, mapDispatchtoProps)(Validation)