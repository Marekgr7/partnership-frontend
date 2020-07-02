import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    isPartnership: null,
    isOwner: null,
    token: null,
    login: () => {},
    logout: () => {}
});

