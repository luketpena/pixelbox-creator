const registerReducer = (state = {
    avatar: ''
  }, action) => {
  switch (action.type) {
    case 'SET_AVATAR': return {...state, avatar: action.payload} 
    default: return state;
  }
};

// user will be on the redux state at:
// state.user
export default registerReducer;
