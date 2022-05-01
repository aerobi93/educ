import { connect } from "react-redux"; 
import Form from '../../components/form'
import { changeMessageRequest, emptyFields, sentNewValidationCode  } from "../../action";

const mapStateToProps = (state) => ({
  loading: state.loading,
  message : state.messageRequest
})

const mapDispatchToProps = (dispatch) => ({
  changeMessageRequest: () => {
    dispatch(changeMessageRequest(''))
  },
  sentNewValidationCode : () =>{
    dispatch(sentNewValidationCode())
  },
  emptyFields: () => {
    dispatch(emptyFields())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)