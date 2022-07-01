import { connect } from "react-redux";
import App from "../../components/app";

import { emptyFields, changeLoading, findAllData, isConnect } from "../../action"

const mapStateToProps = (state) => ({
  messageAjax: state.messageRequest,
  status : state.statusRequest,
  role: state.role,
  loading : state.loading
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)