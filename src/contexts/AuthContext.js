import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase' // this is the firebase object, it is used to access the firebase database

const AuthContext = React.createContext() // this is the context object

export function useAuth() { // this is a custom hook, it is used to access the context object   
    return useContext(AuthContext)
}

export function AuthProvider({ children }) { // this is a component that wraps around the components that need access to the context object
    const [currentUser, setCurrentUser] = useState() // current user is the user that is currently logged in, it is null if no user is logged in
    function signup(email, password) { // this is a function that is used to sign up a user
        return auth.createUserWithEmailAndPassword(email, password) // this is a firebase function that is used to create a user in the firebase database, it will return a promise that will resolve to the user object, if the user is created successfully, or it will reject with an error
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => { // this is a firebase function that is used to listen for changes in the current user, it will be called whenever the current user changes, it will be called with the current user object, or it will be called with null if no user is logged in, it will return a function that can be used to unsubscribe from the listener, this is useful if the listener is created inside a component, and the component is unmounted, the listener will be unsubscribed automatically 
            setCurrentUser(user) // this will set the current user to the user that is passed to the function   
        })

        return unsubscribe // this will unsubscribe from the listener when the component is unmounted

    }, [])


    const value = { // this is the value that is passed to the context object
        currentUser,
        signup
    }
    return (
        // this is the provider component, it is used to pass the value to the context object
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
