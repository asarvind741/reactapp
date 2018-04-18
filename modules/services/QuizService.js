export function submitQuiz(data) {
    console.log("quiz data", data);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return dispatch => {
        return fetch('/api/user/quiz/submit', requestOptions);
    }
}