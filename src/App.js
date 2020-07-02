import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

import {AuthContext} from './shared/context/auth-context';
import {useAuth} from './shared/hooks/auth-hook';

import AuthPage from './users/pages/AuthPage';
import MainPage from './users/pages/MainPage';
import PartnershipPage from './users/pages/PartnershipPage';
import EmployeesPage from './users/pages/EmployeesPage';
import SettingsPage from "./users/pages/SettingsPage";
import ReferralRegisterPage from "./users/pages/ReferralRegisterPage";

import MainNavigation from "./shared/components/Navigation/MainNavigation";



import './App.css';

const App = () => {
    const {token, login, logout, userId, isPartnership, isOwner} = useAuth();

    let routes;

    if (token) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <MainPage/>
                </Route>
                {isPartnership && <Route path="/partnership" exact>
                    <PartnershipPage/>
                </Route>}
                {isOwner && <Route path="/employees" exact>
                    <EmployeesPage/>
                </Route>}
                {isOwner && <Route path="/settings" exact>
                    <SettingsPage/>
                </Route>}
                <Redirect to="/"/>
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <AuthPage/>
                </Route>
                <Route exact path="/register/:referral" render={(props) => {
                    return <ReferralRegisterPage referral={props.match.params.referral} />
                }}/>
                <Redirect to="/"/>
            </Switch>
        );
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn: !!token,
            token: token,
            userId: userId,
            isPartnership: isPartnership,
            isOwner: isOwner,
            login: login,
            logout: logout
        }}>
            <Router>
                {token && <MainNavigation/>}
                <main>{routes}</main>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
