import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

import AuthPage from './users/pages/AuthPage';
import Login from './users/components/Login';
import Register from './users/components/Register';


import MainNavigation from "./shared/components/Navigation/MainNavigation";


const App = () => {
  const { token, login, logout, userId, partnership } = useAuth();

  let routes;

  if (token) {
    routes = (
        <Switch>
         {/*TODO routes to set signed user */}
        </Switch>
    );
  } else {
    routes = (
     <Switch>
       <Route path="/" exact>
         <AuthPage />
       </Route>
     </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{
    isLoggedIn: !!token,
    token: token,
    userId: userId,
    partnership: partnership,
    login: login,
    logout: logout
    }}>
      <Router>
        {token && <MainNavigation />}
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
