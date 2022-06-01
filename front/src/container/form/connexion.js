import { connect } from "react-redux";
import Connexion from "../../components/form/connexion";

import { sendFormConnexion, changeLoading} from "../../action";

const mapStateToProps = (state) => ({
  password: state.password,
  status : state.statusRequest,
  role: state.role
})

const mapDispatchToProps = (dispatch) => ({
  sendFormConnexion : () => {
    dispatch(sendFormConnexion())
  },
  changeLoading : () => {
    dispatch(changeLoading())
  },
})

export default connect(mapStateToProps,mapDispatchToProps)(Connexion)