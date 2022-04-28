import { createStore, applyMiddleware, compose } from 'redux';
import  reducer  from '../reducers';
import debug from '../middleware/debug';
import ajax from '../middleware/ajax';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(debug, ajax)
));
export default store;