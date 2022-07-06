import { connect } from 'react-redux'
import Interface from '../../components/interface';

import { saveResult, sentExercices, sentResultExercices  } from '../../action';
const mapStatetoProps = (state) => ({
    exercices: state.exercices,
    resultExercices: state.exercicesFinished,
  })
  
  const mapDispatchtoProps = (dispatch) => ({
    sentExercices: (value) => {
      dispatch(sentExercices(value))
    },
    sentResultExercices : (value) => {
      dispatch(sentResultExercices(value))
    },
    saveResult : (name, typeExercise, timerest) => {
      dispatch(saveResult(name, typeExercise, timerest))
    }
  })
  
  export default connect(mapStatetoProps, mapDispatchtoProps)(Interface)