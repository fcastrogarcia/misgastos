import React, { useState } from "react";
import styles from "./View.module.scss";
import cx from "classnames";
import { Scrollbars } from "react-custom-scrollbars";
import Navigation from "../Navigation";
import useSearchEngine from "../useSearchEngine";

const SinglePaymentView = ({ error, handleChange }) => (
  <div className={styles["half-width-wrapper"]}>
    <h3 className={styles.title}>¿Qué tenés que pagar?</h3>
    <input
      className={cx(styles.input, { [styles.error]: error })}
      name="category"
      type="text"
      autoComplete="off"
      onChange={handleChange}
    ></input>
  </div>
);

const MonthlyPaymentView = ({
  error,
  handleChange,
  searchResults,
  setData,
  data
}) => {
  const [focus, setFocus] = useState(false);

  function handleSelect(_, item) {
    setData(prevState => {
      return {
        ...prevState,
        category: item
      };
    });
  }

  return (
    <div className={styles["half-width-wrapper"]}>
      <h3 className={styles.title}>Elegí el servicio</h3>
      <div className={styles["relative-container"]}>
        <input
          className={cx(styles.input, { [styles.error]: error })}
          type="text"
          name="category"
          placeholder="Ej.: Internet"
          autoComplete="off"
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={data.category}
        />
        {focus && searchResults.length > 0 && (
          <ul className={cx(styles["dropdown-list"])}>
            <Scrollbars autoHeight autoHeightMax={160}>
              {searchResults.map((item, i) => (
                <li
                  onMouseDown={e => handleSelect(e, item)}
                  key={i}
                  className={styles["list-item"]}
                >
                  {item}
                </li>
              ))}
            </Scrollbars>
          </ul>
        )}
      </div>
      <div className={styles["extra-margin-top"]}>
        <label className={cx(styles.label)} htmlFor="provider">
          Ingresá el proveedor (opcional)
        </label>
        <input
          className={styles.input}
          name="provider"
          type="text"
          placeholder="Ej.: Fibertel"
          autoComplete="off"
          onChange={handleChange}
        ></input>
      </div>
    </div>
  );
};

export default ({ payment, setPayment, setIndex }) => {
  const [data, setData] = useState({ category: "", provider: "" });
  const [error, setError] = useState(null);
  const { handleSearch, searchResults } = useSearchEngine();

  const { single_payment } = payment;

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "category") handleSearch(value);
    setData(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
    if (value && name === "category") setError(false);
  }

  function handleForward() {
    if (data.category) {
      setPayment(prevState => {
        return {
          ...prevState,
          ...data
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
        <SinglePaymentView handleChange={handleChange} error={error} />
      ) : (
        <MonthlyPaymentView
          handleChange={handleChange}
          error={error}
          searchResults={searchResults}
          setData={setData}
          data={data}
        />
      )}
      <Navigation
        handleBackward={() => setIndex(0)}
        handleForward={handleForward}
      />
    </div>
  );
};
