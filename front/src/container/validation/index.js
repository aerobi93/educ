import{ connect }from "react-redux";
import Validation from "../../components/validation";
import { validationCode, changeLoading } from "../../action"

const mapStatetoProps = (state) => ({
  loading: state.loading,
  password: state.password,
  messageAjax : state.messageResquet,
  status : state.statusRequest
})

const mapDispatchtoProps = (dispatch) => ({
  validationCode: (value, typeAsk) => {
    dispatch(validationCode(value, typeAsk))
  },
  changeLoading : (exercice, response, result ) => {
    dispatch(changeLoading(exercice, response, result ))
  },
})

export default connect(mapStatetoProps, mapDispatchtoProps)(Validation)