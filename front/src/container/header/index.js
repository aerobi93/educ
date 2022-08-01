import { connect } from "react-redux";
import Header from "../../components/header";

const mapStatetoProps =(state) => ({
  widthWindow : state.widthWindow,
  displayTrigram : state.displayTrigram
})
const mapDispatchtoProps = () => ({})

export default connect(mapStatetoProps,mapDispatchtoProps)(Header)