import { connect } from "react-redux";
import Color from "../../components/interface/color";

import { setResponseNewValue, sentExercices, sentResultExercices} from '../../action'
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Color)