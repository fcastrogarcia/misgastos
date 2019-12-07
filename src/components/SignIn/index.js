import React, { useContext } from "react";
import firebaseContext from "../Firebase/context";

export default () => {
  const firebase = useContext(firebaseContext);
  console.log(firebase);
  function logIn() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopUp(provider)
      .then(result => console.log(result));
  }
  return (
    <React.Fragment>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          maxHeight: "100%",
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <button onClick={logIn}>Sign In</button>
      </div>
    </React.Fragment>
  );
};
