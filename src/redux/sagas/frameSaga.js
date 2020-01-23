import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * getFrames(action) {
  const response = yield axios.get('/api/frame');
  yield put({type: 'SET_USER_FRAMES', payload: response.data})
}

function * newFrame(action) {
  console.log('------< Posting new frame.');
  
  const frameId = yield axios.post('/api/frame',action.payload);
  console.log('------< Got a new ID:',frameId.data);
  
  yield put({type: 'SET_FRAME_ID', payload: frameId.data})
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
  yield put({type: 'CONFIRM_SAVE'});
}

function * getSavedFrame(action) {
  const response = yield axios.get('/api/frame/edit/'+action.payload);
  yield put({type: 'SET_EDIT_FRAME', payload: response.data});
}

function * duplicateFrame(action) {
  const response = yield axios.get('/api/frame/edit/'+action.payload);
  let duplicate = {...response.data};
  duplicate.id = -1;
  duplicate.frame_name = 'Copy of ' + duplicate.frame_name;
  yield put({type: 'SET_EDIT_FRAME', payload: duplicate});
  yield put({type: 'SET_FRAME_SAVE', payload: false});
}

function * exportFrame(action) {
  const response = yield axios.get('/api/frame/edit/'+action.payload);
  yield put({type: 'EXPORT_SET_FRAME', payload: response.data});
  yield put({type: 'EXPORT_SET_CONTENT'});
  yield put({type: 'EXPORT_SET_ACTIVE', payload: true})
}

function * exportEditFrame(action) {
  yield put({type: 'EXPORT_SET_FRAME', payload: action.payload});
  yield put({type: 'EXPORT_SET_CONTENT'});
  yield put({type: 'EXPORT_SET_ACTIVE', payload: true})
}

function * frameSaga() {
  yield takeLatest('POST_NEW_FRAME', newFrame);
  yield takeLatest('GET_USER_FRAMES', getFrames);
  yield takeLatest('DELETE_FRAME', deleteFrame);
  yield takeLatest('SAVE_FRAME', saveFrame);
  yield takeLatest('GET_SAVED_FRAME', getSavedFrame);
  yield takeLatest('DUPLICATE_FRAME', duplicateFrame);
  yield takeLatest('EXPORT_FRAME',exportFrame);
  yield takeLatest('EXPORT_EDIT_FRAME', exportEditFrame);
}

export default frameSaga;