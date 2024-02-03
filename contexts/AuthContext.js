import React, {createContext, useContext, useState, useEffect} from 'react';

export const AuthContext = createContext();

export function useAuth(){
    const auth = useContext(AuthContext);
    return auth;
}

export function AuthProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(()=>{
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    },[]);
    const login = (value)=>{
        localStorage.setItem('token', value);
        if(value){
            setIsLoggedIn(true);
        }
    }
    const logout = ()=>{
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }
    return(<AuthContext.Provider
        value = {{
            isLoggedIn,
            login,
            logout
        }}
    >{children}</AuthContext.Provider>)
}