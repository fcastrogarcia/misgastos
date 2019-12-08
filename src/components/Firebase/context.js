import React, { createContext } from "react";
import Firebase from "./firebase";

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
