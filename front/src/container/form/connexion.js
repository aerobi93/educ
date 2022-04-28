import { connect } from "react-redux";
import Connexion from "../../components/form/connexion";

import { changeErrorFields, sendFormConnexion } from "../../action";

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
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(Connexion)