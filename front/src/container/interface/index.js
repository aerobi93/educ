import { connect } from 'react-redux'
import Interface from '../../components/interface';

import { saveResult, getCategories, changeLoading, begin, setMinute, setSeconde } from '../../action';

const mapStatetoProps = (state) => ({
    exercices: state.exercices,
    resultExercices: state.exercicesFinished,
    allCategories : state.allCategories,
    loading : state.loading,
    begin : state.begin,
    average : state.average,
    minute : state.minute,
    seconde : state.seconde
  })
  
  const mapDispatchtoProps = (dispatch) => ({

    saveResult : (name, typeExercise, timerest) => {
      dispatch(saveResult(name, typeExercise, timerest))
    },
    getCategories : () => {
      dispatch(getCategories())
    },
    changeLoading : () => {
      dispatch(changeLoading())
    },
    setBegin : () => {
      dispatch(begin())
    },
    setMinute : (value) => {
      dispatch(setMinute(value))
    },
    setSeconde : (value) => {
      dispatch(setSeconde(value))
    }
  })
  
  export default connect(mapStatetoProps, mapDispatchtoProps)(Interface)