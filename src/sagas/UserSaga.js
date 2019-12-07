import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import { AuthActions, ActionTypes } from '../actions';
import API from '../api/NetworkHandler';
import Cookies from 'universal-cookie';


const {
  LOGIN_REQUEST, REGISTER_REQUEST, SHOW_ALERT, FETCH_USER,
  FETCH_USER_SUCCESS, FETCH_USER_RESUMES, FETCH_USER_RESUMES_SUCCESS, SHOW_GLOBAL_LOADER, HIDE_GLOBAL_LOADER
} = ActionTypes;

const {
  onFailureOfLoginRequest, onSuccessOfLoginRequest, onFailureOfRegisterRequest,
} = AuthActions;


function* loginRequest(action) {
  let response;
  const { payload } = action;
  try {
    yield put({ type: SHOW_GLOBAL_LOADER});
    response = yield call(API.sendRequest, 'post', '/login', payload);
    yield put({ type: HIDE_GLOBAL_LOADER });
    yield put(onSuccessOfLoginRequest(response.data));
    localStorage.setItem('TOKEN', response.data.token.toString());
    const cookies = new Cookies();
    cookies.set('auth_token', response.data.token.toString(), { path: '/' });

    yield put({ type: SHOW_ALERT, payload: { message: 'Login Successful', type: 'success' } });
    window.location = '/';
  } catch (e) {
    console.error(e);
    yield put({ type: HIDE_GLOBAL_LOADER });
    if (e.response.data && e.response.data.errors && e.response.data.errors.length > 0) {
        yield put({ type: SHOW_ALERT, payload: { message: e.response.data.errors[0].msg, type: 'error' } });
    } else {
        yield put({ type: SHOW_ALERT, payload: { message: e.message, type: 'error' } });
    }

    yield put(onFailureOfLoginRequest(e));
  }
}

function* registerRequest(action) {
  let response;
  const { payload } = action;
    yield put({ type: SHOW_GLOBAL_LOADER});
  try {
    response = yield call(API.sendRequest, 'post', '/register', payload);
    yield put(onSuccessOfLoginRequest(response.data));
    yield put({ type: HIDE_GLOBAL_LOADER});
    localStorage.setItem('TOKEN', response.data.token.token.toString());
    const cookies = new Cookies();
    cookies.set('auth_token', response.data.token.token.toString(), { path: '/' });
    yield put({ type: SHOW_ALERT, payload: { message: 'Registration Successful', type: 'success' } });
    window.location = '/';
  } catch (e) {
    console.error(e);
    yield put({ type: HIDE_GLOBAL_LOADER});
      if (e.response.data.error) {
        yield put({ type: SHOW_ALERT, payload: { message: e.response.data.error.message, type: 'error' } });
    }
      else if (e.response.data && e.response.data.errors && e.response.data.errors.length > 0) {
          yield put({ type: SHOW_ALERT, payload: { message: e.response.data.errors[0].message, type: 'error' } });
      }
  }
}

function* fetchUser(action) {
  let response;
  try {
    response = yield call(API.sendRequest, 'get', '/user');
    yield put({ type: FETCH_USER_SUCCESS, payload: response.data });
  } catch (e) {
    console.error('error', e);
    localStorage.setItem('TOKEN', null);
    window.location = '/login';
  }
}

function* fetchUserResumes() {
  let response;
  try {
    response = yield call(API.sendRequest, 'get', '/profiles');
    yield put({ type: FETCH_USER_RESUMES_SUCCESS, payload: response.data });
  } catch (e) {
    console.error('error', e);
  }
}

export function* doLoginRequest() {
  yield takeEvery(LOGIN_REQUEST, loginRequest);
  yield takeEvery(REGISTER_REQUEST, registerRequest);
  yield takeLatest(FETCH_USER, fetchUser);
  yield takeLatest(FETCH_USER_RESUMES, fetchUserResumes);
}
