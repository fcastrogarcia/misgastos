import React, { useState } from "react";
import styles from "./View.module.scss";
import cx from "classnames";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

export default ({ payment, setPayment, setIndex }) => {
  const [category, setCategory] = useState("");
  const [provider, setProvider] = useState("");
  const [error, setError] = useState(null);

  const { single_payment } = payment;

  function handleClick(event) {
    const { category } = event.target.dataset;
    setCategory(category);
  }
  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "category") {
      setCategory(value);
    }
    if (name === "provider") {
      setProvider(value);
    }
  }
  function handleNavigation() {
    if (category) {
      setPayment(prevState => {
        return {
          ...prevState,
          category: category,
          provider: provider
        };
      });
      setError(false);
      return setIndex(2);
    } else {
      setError(true);
    }
  }

  return (
    <div className={styles.view}>
      {single_payment ? (
        <div className={styles.wrapper}>
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
        <div className={styles.wrapper}>
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
      <button className={styles.prev} onClick={() => setIndex(0)}>
        <FaArrowLeft />
      </button>
      <button className={styles.next} onClick={handleNavigation}>
        <FaArrowRight />
      </button>
    </div>
  );
};
