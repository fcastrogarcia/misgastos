import React, { useContext } from "react";
import cx from "classnames";
import { withRouter } from "react-router-dom";
import styles from "./Modal.module.scss";

import ModalBackground from "../../../ModalBackground";

import firebaseContext from "../../../../context/firebaseContext";

const Modal = ({ setOpen, isOpen, history }) => {
  const firebase = useContext(firebaseContext);

  function logOut() {
    firebase.signOut().finally(() => history.push("/signin"));
  }

  return (
    <ModalBackground isOpen={isOpen}>
      <div className={styles.modal}>
        <h3 className={cx(styles.title, "modal-title")}>¿Desea salir?</h3>
        <button className={styles.cancel} onClick={() => setOpen(!isOpen)}>
          Cancelar
        </button>
        <button className={styles.exit} onClick={logOut}>
          Salir
        </button>
      </div>
    </ModalBackground>
  );
};

export default withRouter(Modal);
