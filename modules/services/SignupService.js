import {ADD_USER } from '../components/actions/UserActions';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

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

export function logoutUser(logoutUser) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(logoutUser)
    };
    return dispatch =>{
        return fetch('api/user/logout', requestOptions);
}
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