import { connect } from 'react-redux'
import Interface from '../../components/interface';

import { saveResult, sentExercices, sentResultExercices, getCategories, changeLoading  } from '../../action';

const mapStatetoProps = (state) => ({
    exercices: state.exercices,
    resultExercices: state.exercicesFinished,
    allCategories : state.allCategories,
    loading : state.loading
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
    }
  })
  
  export default connect(mapStatetoProps, mapDispatchtoProps)(Interface)