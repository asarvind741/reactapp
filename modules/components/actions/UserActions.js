import { ADD_USER, EDIT_USER } from './types';

export function addUser(user) {

    console.log("user, userinfo", user);
    return {
        type: ADD_USER,
        user
    }
}

export function editUser(user){
    return {
        type: EDIT_USER,
        user
      }
}

export function deleteUser(users){
    return {
        type: DELETE_USER,
        user
      }
}