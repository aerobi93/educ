import { connect } from "react-redux";
import Connexion from "../../components/form/connexion";

const mapStateToProps = (state) => ({
  pseudo: state.pseudo,
  password: state.password,
  
})

const mapDispatchToProps = (dispatch, props) => ({})

export default connect(mapStateToProps,mapDispatchToProps)(Connexion)