const exportReducer = (state = {
  active: true
}, action) => {
  switch (action.type) {
    case 'EXPORT_SET_ACTIVE': return {...state, active: action.payload}
    default: return state;
  }
};

// user will be on the redux state at:
// state.user
export default exportReducer;
