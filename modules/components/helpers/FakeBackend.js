let users = JSON.parse(localStorage.getItem('users')) || [];

export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                if (url.endsWith('/api/user/register') && opts.method === 'POST') {
                    // get new user object from post body
                    let newUser = JSON.parse(opts.body);

                    // validation
                    let duplicateUser = users.filter(user => { return user.email === newUser.email; }).length;
                    if (duplicateUser) {
                        console.log("duplicate");
                        resolve({ status: 401, statusText: 'Username "' + newUser.email + '" is already taken' });
                        return;
                    }

                    // save new user
                    newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));
                    console.log('users are-----', users);

                    // respond 200 OK
                    resolve({ status: 200, statusText: 'ok' });

                    return;
                }

                if (url.endsWith('api/user/login') && opts.method === 'POST') {
                    let params = JSON.parse(opts.body);

                    let filteredUsers = users.filter(user => {
                        return user.email === params.email && user.password === params.password;
                    });
                    if (filteredUsers.length > 0) {
                        let user = filteredUsers[0];
                        resolve({ status: 200, statusText: user });
                        return;

                    }
                    else {
                        resolve({ status: 401, statusText: 'Username or Password is incorrect' });
                        return;
                    }
                }

                if (url.endsWith('api/user/update') && opts.method === 'POST') {
                    let params = JSON.parse(opts.body);

                    let filteredUsers = users.filter(user => {
                        return user.email === params.email;
                    });

                    if (filteredUsers.length > 0) {
                        let user = filteredUsers[0];
                        console.log("users are---", users);
                        user.password = params.password;
                        resolve({ status: 200, statusText: 'Your Password has been changed.' });
                        return;
                    }
                    else {
                        resolve({ status: 401, statusText: 'Username is not correct' });
                        return;
                    }
                }

                if (url.endsWith('api/users') && opts.method === 'GET') {
                    resolve({ status: 200, usersList: users });
                    return;
                }

                if (url.endsWith('/api/user/delete') && opts.method === 'POST') {
                    let deleteUser = JSON.parse(opts.body);


                    let filteredUsers = users.filter(user => {
                        return deleteUser.email == user.email;

                    })

                    if (filteredUsers.length > 0) {
                        let user = filteredUsers[0];
                        let params = { key: 'email', value: user.email };

                        function removeByKey(users, params) {
                            users.some(function (item, index) {
                                if (users[index][params.key] === params.value) {
                                    // found it!
                                    let removedUser = users.splice(index, 1);
                                    console.log("removed user", removedUser);
                                    if (removedUser.length > 0) {
                                        resolve({ status: 200, statusText: `${user.email} has been removed` })
                                        return
                                    }

                                    else {
                                        resolve({ status: 401, statusText: `Kya kr rha be. Dhng se dekh pehle` })
                                        return;
                                    }
                                }
                            });
                        }

                    }
                }



            });
    });
};
}