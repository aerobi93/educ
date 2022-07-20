import { connect } from "react-redux";
import Color from "../../components/interface/color";

import { setResponseNewValue, sentExercices, sentResultExercices, begin, sentAverage} from '../../action'
const mapStateToProps = (state) => ({
  exercices : state.exercices,
  responseNewValue : state.responseNewValue,
  resultExercices : state.exercicesFinished,
  minute : state.minute,
  seconde : state.seconde,
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
  setBegin : () => {
    dispatch(begin())
  },
  sentAverage : (value) => {
    dispatch(sentAverage(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Color)