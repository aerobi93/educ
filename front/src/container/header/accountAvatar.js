import { connect } from "react-redux";
import AccountAvatar from "../../components/header/accountAvatar";

import { isConnect} from "../../action"

const mapStateToProps = (state) => ({
  connected : state.connected,
})

const mapDispatchToProps = (dispatch) => ({
  isConnect: (value) => {
    dispatch(isConnect(value))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountAvatar)