import { ADD_USER, EDIT_USER, DELETE_USER } from '../actions/types';

export default (state = [], action ={}) => {
    switch (action.type) {
        case ADD_USER:
            return [
                ...state,
                action.user
            ];

        case DELETE_USER:
        const removeUser = JSON.parse(action.user);
        return  state.filter(user => user.email != removeUser.email);;

        default:
            return state;
    }
}