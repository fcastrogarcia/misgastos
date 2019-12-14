import React, { useState } from "react";
import styles from "./View.module.scss";
import cx from "classnames";
import Navigation from "./Navigation";

export default ({ payment, setPayment, setIndex }) => {
  const [state, setState] = useState({ category: "", provider: "" });
  const [error, setError] = useState(null);

  const { single_payment } = payment;

  function handleChange(e) {
    const { name, value } = e.target;
    setState(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
    name && name === "category" && setError(false);
  }
  function handleForward() {
    if (state.category) {
      setPayment(prevState => {
        return {
          ...prevState,
          ...state
        };
      });
      setError(false);
      return setIndex(2);
    } else {
      setError(true);
    }
  }

  return (
    <div className={styles["full-space-container"]}>
      {single_payment ? (
        <div className={styles["half-width-wrapper"]}>
          <h3 htmlFor="category" className={styles.title}>
            ¿Qué tenés que pagar?
          </h3>
          <input
            className={cx(styles.input, { [styles.error]: error })}
            name="category"
            type="text"
            onChange={handleChange}
          ></input>
        </div>
      ) : (
        <div className={styles["half-width-wrapper"]}>
          <h3 className={styles.title}>Elegí el servicio</h3>
          <input
            className={cx(styles.input, { [styles.error]: error })}
            type="text"
            name="category"
            placeholder="Ej.: Internet"
            onChange={handleChange}
          />
          <div style={{ marginTop: "15px" }}>
            <label htmlFor="provider">Ingresá el proveedor (opcional)</label>
            <input
              className={styles.input}
              name="provider"
              type="text"
              placeholder="Ej.: Fibertel"
              onChange={handleChange}
            ></input>
          </div>
        </div>
      )}
      <Navigation
        handleBackward={() => setIndex(0)}
        handleForward={handleForward}
      />
    </div>
  );
};
