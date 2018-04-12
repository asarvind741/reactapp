/* export function setAutherization(user){
  console.log("user", user);
  user =JSON.stringify(user);
  localStorage.setItem('currentUser', user);
  console.log("local------", localStorage.getItem('currentUser'));
  return;
} */

export function logoutUser(){
  console.log("removed user from storage");
  localStorage.removeItem('currentUser');
  console.log("removed user from storage");
}