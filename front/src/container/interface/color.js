import { connect } from "react-redux";
import Color from "../../components/interface/color";

import { setResponseNewValue, sentExercices, sentResultExercices, begin, sentAverage} from '../../action'
const mapStateToProps = (state) => ({
  exercices : state.exercices,
  responseNewValue : state.responseNewValue,
  resultExercices : state.exercicesFinished
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
  sentAverage : (name, value) => {
    dispatch(sentAverage(name, value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Color)