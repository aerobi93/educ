import{ connect }from "react-redux";
import Validation from "../../components/validation";
import { changeValidation } from "../../action"

const mapStatetoProps = (state) => ({
  loading: state.loading
})

const mapDispatchtoProps = (dispatch) => ({
  changeValidation : (value) => {
    dispatch(changeValidation(value))
  }
})

export default connect(mapStatetoProps, mapDispatchtoProps)(Validation)