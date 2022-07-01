const debug = (state) => (next) => (action) => {

    next(action);
  };
  export default debug;