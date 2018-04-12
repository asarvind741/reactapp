export function logoutUser(){
  localStorage.removeItem('currentUser');
}

export function setAuthorization(user) {
  console.log("user in local storage----", localStorage.getItem('currentUser'));
 localStorage.setItem('currentUser', user);
}