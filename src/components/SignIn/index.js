import React from "react";
import { withRouter } from "react-router-dom";

import SignIn from "./SignIn";
import styles from "./SignIn.module.scss";

import useAuthAndFirebase from "../../context/useAuthAndFirebase";

const SignInPage = ({ history }) => {
  const { firebase, dispatch } = useAuthAndFirebase();

  async function handleSignIn() {
    dispatch({ type: "LOADING" });
    await firebase
      .signInWithGoogle()
      .then(socialAuthUser => {
        dispatch({ type: "AUTHENTICATED", payload: socialAuthUser });

        firebase.user(socialAuthUser.user.uid).set(
          {
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email
          },
          { merge: true }
        );
      })
      .then(() => history.push("/main"))
      .catch(err => console.log(err));
  }
  return (
    <div className={styles.layout}>
      <SignIn clickHandler={handleSignIn} />
    </div>
  );
};

export default withRouter(SignInPage);
