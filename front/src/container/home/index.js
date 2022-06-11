import { connect } from "react-redux";
import Home from "../../components/home";

import { changeLoading, findAllData } from "../../action"

const mapStatetoProps = (state) => ({
 
})

const mapDispatchtoProps = (dispatch) => ({
  changeLoading : () => {
    dispatch(changeLoading())
  },
  findAllData : () => {
    dispatch(findAllData())
  }
})

export default connect(mapStatetoProps, mapDispatchtoProps)(Home)