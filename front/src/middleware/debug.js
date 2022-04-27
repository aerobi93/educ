const debug = (state) => (next) => (action) => {
  console.log(action)
    next(action);
  };
  export default debug;