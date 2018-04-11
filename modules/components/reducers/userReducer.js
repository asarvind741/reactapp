import { ADD_USER, EDIT_USER } from '../actions/types';

export default (state = [], action ={}) => {
    switch (action.type) {
        case ADD_USER:
            return [
                ...state,
                action.user
            ];

        case EDIT_USER:
            const filteredUsers = state.filter(user => user.email === action.payload.user.email);
            const isUserExist = filteredUsers.length > 0;
            if (isUserExist) {
                const updatedUser = {

                };
            }
            return state;
        default:
            return state;
    }
}