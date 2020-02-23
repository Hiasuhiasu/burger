import {takeEvery} from 'redux-saga/effects';

import * as actionTypes from '../actions/actonType';
import {logoutSaga, checkAuthTimeOutSaga} from './auth';

export function* watchAuth(){
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeOutSaga);
}