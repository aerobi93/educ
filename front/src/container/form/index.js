import { connect } from "react-redux"; 
import Form from '../../components/form'
import { changeMessageRequest, emptyFields, sentNewValidationCode, changeLoading, count } from "../../action";

const mapStateToProps = (state) => ({
  loading: state.loading,
  message : state.messageRequest,
  email: state.email
})

const mapDispatchToProps = (dispatch) => ({
  changeMessageRequest: () => {
    dispatch(changeMessageRequest(''))
  },
  sentNewValidationCode : () =>{
    dispatch(sentNewValidationCode('password'))
  },
  emptyFields: () => {
    dispatch(emptyFields())
  },
  changeLoading : () => {
    dispatch(changeLoading())
  },
  count : () => {
    dispatch(count())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)