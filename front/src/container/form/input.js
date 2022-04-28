import { connect } from "react-redux";
import Input from "../../components/form/input";
import { changeValue } from "../../action";

const mapStateToProps= (state) => ({
  errorFields: state.errorFields
})

const mapDispatchToProps = (dispatch, props)=> ({
  changeValue: (value) => {
    dispatch(changeValue(value, props.id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Input)