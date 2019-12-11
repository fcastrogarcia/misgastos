import React from "react";
import styles from "./View.module.scss";
import cn from "classnames";

export default ({ expense, setExpense, setIndex }) => {
  function handleClick(event) {
    const { type } = event.target.dataset;
    setExpense(prevState => {
      return { ...prevState, category: type };
    });
    setIndex(2);
  }

  return (
    <div className={styles.view}>
      <h3>Elegí el servicio</h3>
      <ul>
        <li>
          <button onClick={handleClick} data-type="internet">
            Internet
          </button>
        </li>
        <li>
          <button onClick={handleClick} data-type="gas">
            Gas
          </button>
        </li>
        <li>
          <button onClick={handleClick} data-type="soda">
            Soda
          </button>
        </li>
        <li>
          <button onClick={handleClick} data-type="porn">
            PornHub
          </button>
        </li>
      </ul>
    </div>
  );
};
