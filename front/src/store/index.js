import { createStore, applyMiddleware, compose } from 'redux';
import  reducer  from '../reducers';
import debug from '../middleware/debug';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(debug),
));
export default store;