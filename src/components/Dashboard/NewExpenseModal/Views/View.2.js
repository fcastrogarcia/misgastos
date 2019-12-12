import React, { useState } from "react";
import styles from "./View.module.scss";
import cn from "classnames";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

export default ({ payment, setPayment, setIndex }) => {
  const [category, setCategory] = useState("");
  const [provider, setProvider] = useState("");

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
      return setIndex(2);
    } else {
      alert("No ingresaste una categoría");
    }
  }

  return (
    <div className={styles.view}>
      {single_payment ? (
        <React.Fragment>
          <h3 htmlFor="category" className={styles.title}>
            ¿Qué tenés que pagar?
          </h3>
          <input
            className={styles.input}
            name="category"
            type="text"
            onChange={handleChange}
          ></input>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h3 className={styles.title}>Elegí el servicio</h3>
          <input
            className={styles.input}
            type="text"
            name="category"
            onChange={handleChange}
          />
          <label htmlFor="provider">Ingresá el proveedor (opcional)</label>
          <input
            className={styles.input}
            name="provider"
            type="text"
            onChange={handleChange}
          ></input>
        </React.Fragment>
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
