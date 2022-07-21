import { connect } from "react-redux";
import Calculated from "../../components/interface/calculated";

import { setResponseNewValue, sentExercices, sentResultExercices,begin, sentAverage } from '../../action'
const mapStateToProps = (state) => ({
  exercices : state.exercices,
  responseNewValue : state.responseNewValue,
  resultExercices : state.exercicesFinished,
  begin : state.begin,
  childrenData : state.data.student,
  minute : state.minute,
  seconde : state.seconde
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
  sentAverage : (value) => {
    dispatch(sentAverage(value))
  },
  setBegin : () => {
    dispatch(begin())
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(Calculated)