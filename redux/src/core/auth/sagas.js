import { call, cancel, fork, put, take } from 'redux-saga/effects';

function* watchAuthenticationComplete() {
  while (true) {
      let action = yield take('AUTHENTICATE_COMPLETE');
      yield put({ type: 'CLOSE_AUTH' });
  }
}

export const authSagas = [
  fork(watchAuthenticationComplete),
]
