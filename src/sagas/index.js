import { fork, all } from 'redux-saga/effects';
//import * as UserSaga from './UserSaga';

export default function* rootSaga() {
  yield all(
    [
     // ...Object.values(UserSaga),
    ].map(fork),
  );
}
