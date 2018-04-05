import axios from 'axios';

export function userSignupRequest(userData){
   // console.log("dispatch data-------", userData);
    
         return axios.post('/api/users', userData);


    /* return dispatch => {
        return axios.post('/api/users', userData);
    } */
}

export function isUserExists(identifier) {
    return dispatch => {
      return axios.get(`/api/users/${identifier}`);
    }
  }

export function loginUserRequest(loginData){
    // console.log("this is login user info", loginData);
    return axios.post('api/users/login', loginData);
}