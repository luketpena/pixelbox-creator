import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_LOGIN_ERROR':
      return '';
    case 'LOGIN_INPUT_ERROR':
      return 'Enter your username and password!';
    case 'LOGIN_FAILED':
      return 'Oops! The username and password didn\'t match. Try again!';
    case 'LOGIN_FAILED_NO_CODE':
      return 'Oops! Something went wrong! Is the server running?';
    default:
      return state;
  }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const registrationMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_REGISTRATION_ERROR':
      return '';
    case 'REGISTRATION_INPUT_ERROR':
      return 'Choose a username and password!';
    case 'REGISTRATION_AVATAR_ERROR':
      return 'Please choose a character!';
    case 'REGISTRATION_FAILED':
      return 'Oops! That didn\'t work. The username might already be taken. Try again!';
    default:
      return state;
  }
};

const emptyAlert = {
  active: false,
  response: 'none',
  title: '',
  message: '',
  confirm: '',
  reject: '',
  neutral: ''
}

const appMessage = (state = emptyAlert, action)=> {
  switch(action.type) {
    case 'SET_APP_ALERT': return {...action.payload, active: true};
    case 'SET_APP_ALERT_RESPONSE': return {...state, response: action.payload};
    case 'SET_APP_ALERT_ACTIVE': return {...state, active: false};
    case 'RESET_APP_ALERT': return emptyAlert;
    default: return state;
  }
}

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  loginMessage,
  registrationMessage,
  appMessage,
});
