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

export const logOut =()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut =(expirationTime)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logOut());
        },expirationTime*1000);
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
                const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000);
                console.log(response);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('localId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeOut(response.data.expiresIn));
            })
            .catch(err=>{
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    };
};

export const setAuthRedirectPath =(path)=>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState =()=>{
    return dispatch=>{
        const token=localStorage.getItem('token');
        if(!token){
            dispatch(logOut());
        }else{
            const expirationTime=new Date(localStorage.getItem('expirationDate'));
            if(expirationTime > new Date()){
                const localId=localStorage.getItem('localId'); 
                dispatch(authSuccess(token, localId));
                dispatch(checkAuthTimeOut((expirationTime.getTime()-new Date().getTime())/1000));
            }else{
                 dispatch(logOut());
            }
        }
    }
};