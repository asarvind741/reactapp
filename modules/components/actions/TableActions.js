export function onInsertRow(row) {
    let newRowStr = ''

    for (const prop in row) {
        return newRowStr += prop + ': ' + row[prop] + ' \n'
    }
}

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
        return fetch('/api/user/delete', requestOptions)
    }
}