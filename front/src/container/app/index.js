import { connect } from "react-redux";
import App from "../../components/app";

import { emptyFields } from "../../action"

const mapStateToProps = (state) => ({
  messageAjax: state.messageRequest,
  status : state.statusRequest,
  role: state.role
})

const mapDispatchToProps = (dispatch) => ({
  emptyFields: () => {
    dispatch(emptyFields())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)