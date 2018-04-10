import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function userSignupRequest(user) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };
    return dispatch =>{
    return fetch('/api/user/register', requestOptions)
    }
}

export function isUserExists(identifier) {
    return dispatch => {
        return axios.get(`/api/users/${identifier}`);
    }
}

export function loginUserRequest(loginUser) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginUser)
    };
    return dispatch =>{
    return fetch('api/user/login', requestOptions);
    }
}

export function logout() {
    return { type: userConstants.LOGOUT };
}

export function forgotUserRequest(data){
    const requestOptions = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    };

    return dispatch =>{
        return fetch('api/user/update', requestOptions)
    };
}

export function getUsersList(){
    const requestOptions = {
        method: 'GET'
    };

    return dispatch =>{
        return fetch('api/users', requestOptions)
    };
}