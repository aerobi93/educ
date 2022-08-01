import { connect } from "react-redux";
import Trigram from "../../components/header/trigram";

import { isConnect, changeDisplay} from "../../action"

const mapStateToProps = (state) => ({
  connected : state.connected,
  displayTrigram : state.displayTrigram
 })
 


const mapDispatchToProps = (dispatch) => ({
  isConnect: (value) => {
    dispatch(isConnect(value))
  },
  changeDisplay : (value, name) => {
    dispatch(changeDisplay(value, name))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Trigram)