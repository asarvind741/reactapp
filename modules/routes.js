// import Base from './components/Base.jsx';
import HomePage from './components/Home.js';
// import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './components/Login.js';
import SignUpPage from './components/SignUpPage.js';
// import Auth from './Auth';

const routes = {
    component: Base,

    childRoutes: [
        childRoutes: [

            /* {
              path: '/',
              getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                  callback(null, DashboardPage);
                } else {
                  callback(null, HomePage);
                }
              }
            }, */
        
            {
              path: '/login',
              component: LoginPage
            },
        
            {
              path: '/signup',
              component: SignUpPage
            },
        
            /* {
              path: '/logout',
              onEnter: (nextState, replace) => {
                Auth.deauthenticateUser();
        
                // change the current URL to /
                replace('/');
              }
            } */
    ]]
};

export default routes;