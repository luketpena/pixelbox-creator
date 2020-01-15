import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * getFrames(action) {
  const response = yield axios.get('/api/frame');
  yield put({type: 'SET_USER_FRAMES', payload: response.data})
}

function * newFrame(action) {
  yield axios.post('/api/frame',action.payload);
  yield put({type: 'GET_USER_FRAMES'});
}

function * deleteFrame(action) {
  yield axios.delete('/api/frame/'+action.payload);
  yield put({type: 'GET_USER_FRAMES'});
}

function * saveFrame(action) {
  console.log('Saving existing frame...');
  
  yield axios.put('/api/frame',action.payload);
  yield put({type: 'GET_USER_FRAMES'});
}

function * frameSaga() {
  yield takeLatest('POST_NEW_FRAME', newFrame);
  yield takeLatest('GET_USER_FRAMES', getFrames);
  yield takeLatest('DELETE_FRAME', deleteFrame);
  yield takeLatest('SAVE_FRAME', saveFrame);
}

export default frameSaga;