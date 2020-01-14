const frameReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_USER_FRAMES': return action.payload;
    default: return state;
  }
}
export default frameReducer;