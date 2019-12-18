import { useContext } from "react";
import firebaseContext from "./firebaseContext";
import authContext from "./authContext";

export default () => {
  const firebase = useContext(firebaseContext);
  const { auth, dispatch } = useContext(authContext);

  return {
    firebase,
    auth,
    dispatch
  };
};
