import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import firebaseContext from "../Firebase/context";
import authContext from "../Auth/context";
import SignIn from "./SignIn";
import styles from "./SignIn.module.scss";

const SignInPage = ({ history }) => {
  const firebase = useContext(firebaseContext);
  const { auth, dispatch } = useContext(authContext);

  function handleSignIn() {
    dispatch({ type: "LOADING" });
    firebase
      .signInWithGoogle()
      .then(socialAuthUser => {
        return firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email
        });
      })
      .then(() => history.push("/dashboard"))
      .catch(err => console.log(err));
  }
  console.log("auth from signin: ", auth);
  return (
    <div className={styles.layout}>
      <SignIn clickHandler={handleSignIn} />
    </div>
  );
};

export default withRouter(SignInPage);
