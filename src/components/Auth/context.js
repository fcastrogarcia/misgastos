import React, { createContext, useContext, useEffect, useReducer } from "react";
import firebaseContext from "../Firebase/context";

const AuthContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING": {
      return "loading";
    }
    case "AUTHENTICATED": {
      return action.payload;
    }
    case "UNAUTHENTICATED": {
      return null;
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(reducer, "loading");
  const firebase = useContext(firebaseContext);

  useEffect(() => {
    dispatch({ type: "LOADING" });
    firebase.auth.onAuthStateChanged(user => {
      user
        ? dispatch({ type: "AUTHENTICATED", payload: user })
        : dispatch({ type: "UNAUTHENTICATED" });
    });
  }, []);

  const value = {
    auth,
    dispatch
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
