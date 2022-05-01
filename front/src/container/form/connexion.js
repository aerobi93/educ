import { connect } from "react-redux";
import Connexion from "../../components/form/connexion";

import { changeErrorFields, sendFormConnexion, changeLoading} from "../../action";

const mapStateToProps = (state) => ({
  email: state.email,
  password: state.password,
})

const mapDispatchToProps = (dispatch) => ({
  sendFormConnexion : () => {
    dispatch(sendFormConnexion())
  },
  changeErrorFields : () => {
    dispatch(changeErrorFields())
  },
  changeLoading : () => {
    dispatch(changeLoading())
  },
})

export default connect(mapStateToProps,mapDispatchToProps)(Connexion)