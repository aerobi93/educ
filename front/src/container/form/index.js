import { connect } from "react-redux"; 
import Form from '../../components/form'
import { changeMessageRequest, emptyFields, changeLoading, count, sentNewLink } from "../../action";

const mapStateToProps = (state) => ({
  loading: state.loading,
  message : state.messageRequest,
  status : state.statusRequest,
  email: state.email
})

const mapDispatchToProps = (dispatch) => ({
  changeMessageRequest: () => {
    dispatch(changeMessageRequest(''))
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
  sentNewLink : (value) => {
    dispatch(sentNewLink(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)