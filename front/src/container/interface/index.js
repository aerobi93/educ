import { connect } from 'react-redux'
import Interface from '../../components/interface';

import { saveResult, getCategories, changeLoading, begin, setMinute, setSeconde, sentAverage } from '../../action';

const mapStatetoProps = (state) => ({
    exercices: state.exercices,
    resultExercices: state.exercicesFinished,
    allCategories : state.allCategories,
    loading : state.loading,
    begin : state.begin,
    average : state.average,
    minute : state.minute,
    seconde : state.seconde,
    childId: state.childId
  })
  
  const mapDispatchtoProps = (dispatch) => ({

    saveResult : (timerest, exam, category, note) => {
      dispatch(saveResult(timerest, exam, category, note))
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
    },
    sentAverage : (value) => {
      dispatch(sentAverage(value))
    },
  })
  
  export default connect(mapStatetoProps, mapDispatchtoProps)(Interface)