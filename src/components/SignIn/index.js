import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import firebaseContext from "../Firebase/context";
import authContext from "../Auth/context";

const SignIn = ({ history }) => {
  const firebase = useContext(firebaseContext);
  const { auth, dispatch } = useContext(authContext);

  function logIn() {
    dispatch({ type: "LOADING" });
    firebase
      .signInWithGoogle()
      .then(result => console.log(result))
      .then(() => history.push("/dashboard"))
      .catch(err => console.log(err));
  }
  console.log("auth from signin: ", auth);
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
        <h2>Sign In</h2>
        <button onClick={logIn}>Sign In</button>
      </div>
    </React.Fragment>
  );
};

export default withRouter(SignIn);
