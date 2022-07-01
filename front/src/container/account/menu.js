import { connect } from "react-redux";
import Menu from "../../components/account/menu";

import { changeDisplay, sentNewLink} from "../../action";

const mapStatetoProps = (state) => ({
 role : state.role,
 displayResult : state.displayResult,
 displayAddChild : state.displayAddChild
})

const mapDispatchtoProps = (dispatch) => ({
  changeDisplay : (name, value) => {
    dispatch(changeDisplay(name, value))
  },
  sentNewLink : (value) => {
    dispatch(sentNewLink(value))
  }
})

export default connect(mapStatetoProps, mapDispatchtoProps)(Menu)