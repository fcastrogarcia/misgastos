import React, { createContext, useEffect } from "react";
import app from "./config";

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  useEffect(() => {
    app();
  }, []);
  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};

export default FirebaseContext;
