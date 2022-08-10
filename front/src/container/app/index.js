import { connect } from "react-redux";
import App from "../../components/app";

import { emptyFields, findAllData, isConnect, setWidthWindow , sentNewLink, auth, changeMessageRequest, changeLoading} from "../../action"

const mapStateToProps = (state) => ({
  messageAjax: state.messageRequest,
  status : state.statusRequest,
  role: state.role,
  loading : state.loading,
  student : state.data.student,
  connected : state.connected,
  loading: state.loading,
})

const mapDispatchToProps = (dispatch) => ({
  emptyFields: () => {
    dispatch(emptyFields())
  },
  changeLoading : () => {
    dispatch(changeLoading())
  },
  findAllData : () => {
    dispatch(findAllData())
  },
  isConnect : (value) => {
    dispatch(isConnect(value))
  },
  setWidthWindow : () => {
    dispatch(setWidthWindow())
  },
  sentNewLink : (value) => {
    dispatch(sentNewLink(value))
  },
  auth : () => {
    dispatch(auth())
  },
  changeMessageRequest : (value) => {
    dispatch(changeMessageRequest(value))
  },
  changeLoading : () => {
    dispatch(changeLoading())
  }
  
})

export default connect(mapStateToProps, mapDispatchToProps)(App)