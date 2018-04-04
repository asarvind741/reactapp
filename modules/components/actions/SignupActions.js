import axios from 'axios';

export function userSignupRequest(userData){
    console.log("dispatch data-------", userData);
    
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