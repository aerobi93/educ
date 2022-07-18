import { connect } from 'react-redux'
import Interface from '../../components/interface';

import { saveResult, sentExercices, sentResultExercices, getCategories, changeLoading, begin  } from '../../action';

const mapStatetoProps = (state) => ({
    exercices: state.exercices,
    resultExercices: state.exercicesFinished,
    allCategories : state.allCategories,
    loading : state.loading,
    begin : state.begin,
    average : state.average
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
  })
  
  export default connect(mapStatetoProps, mapDispatchtoProps)(Interface)