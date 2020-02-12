import * as actionTypes from './actonType';
import axios from 'axios';


export const authStart =()=>{
    return {
        type:actionTypes.AUTH_START
    };
}

export const authSuccess =(token, userId)=>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        //authData:authData
        idToken:token,
        userId:userId
    };
}

export const authFail =(error)=>{
    return {
        type: actionTypes.AUTH_FAIL,
        error:error
    };
}

export const auth =(email, password, isSignup)=>{
    return dispatch => {
        dispatch(authStart());
        const authData ={
            email:email,
            password:password,
            returnSecureToken:true
        };
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8BpZ0jhgJVSiuumnR_GdmBApIuDWLxzQ';
        if(!isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8BpZ0jhgJVSiuumnR_GdmBApIuDWLxzQ';
        }
        axios.post(url, authData)
            .then(response=>{
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err=>{
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    };
};