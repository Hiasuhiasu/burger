import {delay} from 'redux-saga/effects';
import {put} from 'redux-saga/effects';

import axios from 'axios';

import * as actions from '../actions/index'

export function* logoutSaga(action){
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeOutSaga(action){
    yield delay(action.expirationTime*1000);
    yield put(actions.logOut());
}

export function* authSaga(action){
    yield put(actions.authStart());
    const authData ={
        email:action.email,
        password:action.password,
        returnSecureToken:true
    };
    let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8BpZ0jhgJVSiuumnR_GdmBApIuDWLxzQ';
    if(!action.isSignup){
        url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8BpZ0jhgJVSiuumnR_GdmBApIuDWLxzQ';
    }
    try{
        const response = yield axios.post(url, authData); 
        const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('localId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeOut(response.data.expiresIn));
    } catch(error){
        yield (error.response.data.error)
    };
}   

export function* authCheckStateSaga(action){
    const token=yield localStorage.getItem('token');
        if(!token){
            yield put(actions.logOut());
        }else{
            const expirationTime=yield new Date(localStorage.getItem('expirationDate'));
            if(expirationTime > new Date()){
                const localId=yield localStorage.getItem('localId'); 
                yield put(actions.authSuccess(token, localId));
                yield put(actions.checkAuthTimeOut((expirationTime.getTime()-new Date().getTime())/1000));
            }else{
                 yield put(actions.logOut());
            }
        }
}