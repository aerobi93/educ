import { connect } from "react-redux";
import Calculated from "../../components/interface/calculated";

import { setResponseNewValue, sentExercices, sentResultExercices,begin, sentAverage} from '../../action'
const mapStateToProps = (state) => ({
  exercices : state.exercices,
  responseNewValue : state.responseNewValue,
  resultExercices : state.exercicesFinished,
  begin : state.begin
})

const mapDispatchToProps = (dispatch) => ({
  setResponseNewValue : (value) => {
    dispatch(setResponseNewValue(value))
  },
  sentExercices: (value) => {
    dispatch(sentExercices(value))
  },
  sentResultExercices : (value) => {
    dispatch(sentResultExercices(value))
  },
  sentAverage : (name, value) => {
    dispatch(sentAverage(name, value))
  },
  setBegin : () => {
    dispatch(begin())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Calculated)