import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    partnership: false,
    token: null,
    login: () => {},
    logout: () => {}
});