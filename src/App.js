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
import MainPage from './users/pages/MainPage';
import PartnershipPage from './users/pages/PartnershipPage';
import EmployeesPage from './users/pages/EmployeesPage';

import MainNavigation from "./shared/components/Navigation/MainNavigation";


import './App.css';


const App = () => {
  const { token, login, logout, userId, partnership } = useAuth();

  let routes;

  if (token) {
    routes = (
        <Switch>
            <Route path = "/" exact>
            <MainPage />
          </Route>
          <Route path = "/partnership" exact>
            <PartnershipPage />
          </Route>
            <Route path = "/employees" exact>
                <EmployeesPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
  } else {
    routes = (
     <Switch>
       <Route path="/" exact>
         <AuthPage />
       </Route>
         <Redirect to ="/" />
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
