import{ connect }from "react-redux";
import Validation from "../../components/validation";
import { validationCode, changeLoading, updateUser, emptyFields } from "../../action"

const mapStatetoProps = (state) => ({
  loading: state.loading,
  password: state.password,
})

const mapDispatchtoProps = (dispatch) => ({
  validationCode: (value, type) => {
    dispatch(validationCode(value, type))
  },
  changeLoading : (exercice, response, result ) => {
    dispatch(changeLoading(exercice, response, result ))
  },
})

export default connect(mapStatetoProps, mapDispatchtoProps)(Validation)