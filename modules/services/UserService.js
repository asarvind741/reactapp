
export function deleteUser(userData) {
    console.log("user", userData);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    };
    return dispatch => {
        return fetch('/api/user/delete', requestOptions);
    }
}

export function updateUserNow(userData) {
    console.log("user", userData);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    };
    return dispatch => {
        return fetch('/api/user/updateUser', requestOptions);
    }
}
