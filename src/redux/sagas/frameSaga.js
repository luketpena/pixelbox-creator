import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * getFrames(action) {
  console.log('Saga action:',action);
  const response = yield axios.get('/api/frame');
  console.log(response.data);
  yield put({type: 'SET_USER_FRAMES', payload: response.data})
}

function* frameSaga() {
  yield takeLatest('GET_USER_FRAMES', getFrames);
}

export default frameSaga;