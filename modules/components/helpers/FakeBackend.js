import sha256 from 'sha256';

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
                    let duplicateUser = users.filter(user => {
                        return user.email === newUser.email;
                    }).length;
                    if (duplicateUser) {
                        resolve({
                            status: 401,
                            statusText: 'Username "' + newUser.email + '" is already taken'
                        });
                        return;
                    }

                    // save new user
                    newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
                    newUser.password = sha256(newUser.password)
                    newUser.confirmpassword = sha256(newUser.confirmpassword)
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    // respond 200 OK
                    resolve({
                        status: 200,
                        statusText: `Congratulations. ${newUser.email} has been registered successfully. Please Login now to continue`,
                        user:newUser
                    });

                    return;
                }

                if (url.endsWith('api/user/login') && opts.method === 'POST') {
                    let params = JSON.parse(opts.body);

                    let filteredUsers = users.filter(user => {
                        return user.email === params.email && user.password === sha256(params.password);
                    });
                    if (filteredUsers.length > 0) {
                        
                        let user = filteredUsers[0];
                        user.isLoggedIn = params.isLoggedIn;
                        console.log("here is the user---", user);
                        resolve({
                            status: 200,
                            statusText: 'You are logged in now. Please continue surfing...',
                            user:user
                        });
                        return;

                    } else {
                        resolve({
                            status: 401,
                            statusText: 'Username or Password is incorrect'
                        });
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
                        resolve({
                            status: 200,
                            statusText: 'Your Password has been changed.'
                        });
                        return;
                    } else {
                        resolve({
                            status: 401,
                            statusText: 'Username is not correct'
                        });
                        return;
                    }
                }

                if (url.endsWith('api/users') && opts.method === 'GET') {
                    resolve({
                        status: 200,
                        usersList: users
                    });
                    return;
                }

                if (url.endsWith('/api/user/delete') && opts.method === 'POST') {
                    let deleteUser = JSON.parse(opts.body);
                    console.log('delete user id', deleteUser.id);

                    for(let i = 0; i<users.length; i++){
                        if(users[i].id === deleteUser.id){
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            resolve({status:200, statusText:`${deleteUser.email} have been successfully deleted`, users:users});
                            return;
                        }
                    }
                }

                if (url.endsWith('/api/user/updateUser') && opts.method === 'POST') {
                    let updatedUser = JSON.parse(opts.body);
                    console.log('update user id', updatedUser.id);

                    for(let i = 0; i<users.length; i++){
                        if(users[i].id === updatedUser.id){
                            users.splice(i, 1,updatedUser);
                            localStorage.setItem('users', JSON.stringify(users));
                            resolve({status:200, statusText:`${updatedUser.email} have been successfully updated`, users:users});
                            return;
                        }
                    }
                }

                if(url.endsWith('api/user/logout') && opts.method === 'POST'){
                    console.log(opts.body);

                }

                if(url.endsWith('api/user/quiz/submit') && opts.method === 'POST'){
                    console.log(opts.body);

                    

                }


            })
        });
    };
}