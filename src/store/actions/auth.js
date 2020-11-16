import * as actionTypes from './actionTypes'
import axios from 'axios'
export const authStart=()=>{
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess=(token,userId)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId
    }
}
export const authFail=(error)=>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const authLogout = (expire) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expire * 1000);
    };
};


export const authRedirect=(path)=>{
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const auth=(email,password,isSignUp)=>{
    return async dispatch=>{
        try {
            dispatch(authStart())
            const authData={
                email:email,
                password:password,
                returnSecureToken:true
            }
            let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAa315hJFRKFtqim3GY523wDaM1mApJ5Q'
            if(!isSignUp){
                url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAa315hJFRKFtqim3GY523wDaM1mApJ5Q'
            }
            const resp=await axios.post(url,authData)
            const expirationDate=new Date(new Date().getTime()+resp.data.expiresIn*1000)
            localStorage.setItem('token',resp.data.idToken)
            localStorage.setItem('expirationDate',expirationDate)
            localStorage.setItem('userId',resp.data.localId)
            dispatch(authSuccess(resp.data.idToken,resp.data.localId))
            dispatch(authLogout(resp.data.expiresIn))
        } catch(e){
            dispatch(authFail(e))
        }
    }
}
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(authLogout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};