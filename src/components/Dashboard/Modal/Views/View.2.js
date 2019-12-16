import React, { useState, useEffect, useRef } from "react";
import styles from "./View.module.scss";
import cx from "classnames";
import { Scrollbars } from "react-custom-scrollbars";
import Navigation from "../Navigation";
import useSearchEngine from "../useSearchEngine";
import { FaCaretDown, FaTimes } from "react-icons/fa";

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
  setCategory,
  category
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentItem, setCurrentItem] = useState(-1);
  const itemsRefs = [];

  function handleSelect(_, item) {
    setCategory(item);
  }

  function handleDelete() {
    setCategory("");
  }

  function handleCaret() {
    setShowDropdown(!showDropdown);
    setCurrentItem(-1);
  }

  function handleBlur() {
    setShowDropdown(false);
    setCurrentItem(-1);
  }

  function handleKeyDown(e) {
    const key = e.keyCode;
    if (key === 40 && currentItem < searchResults.length - 1) {
      setCurrentItem(prevState => prevState + 1);
      currentItem > 2 && itemsRefs[currentItem + 1].scrollIntoView(false);
    }
    if (key === 38 && currentItem > -1) {
      setCurrentItem(prevState => prevState - 1);
      currentItem > 0 && itemsRefs[currentItem - 1].scrollIntoView();
    }
    if (key === 13 && searchResults.length - 1 < currentItem > -1) {
      setCategory(searchResults[currentItem]);
    }
  }

  return (
    <div className={styles["half-width-wrapper"]}>
      <h3 className={styles.title}>Elegí el servicio</h3>
      <div className={styles["relative-container"]}>
        <div className={styles["input-wrapper"]}>
          <input
            className={cx(styles.input, { [styles.error]: error })}
            type="text"
            name="category"
            placeholder="Ej.: Internet"
            onChange={handleChange}
            onFocus={() => setShowDropdown(true)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            value={category}
            autoComplete="off"
          />
          <span className={styles["icons-wrapper"]}>
            {category && (
              <FaTimes className={styles.clear} onClick={handleDelete} />
            )}
            <FaCaretDown className={styles.caret} onClick={handleCaret} />
          </span>
        </div>
        {showDropdown && searchResults.length > 0 && (
          <ul className={cx(styles["dropdown-list"])}>
            <Scrollbars autoHeight autoHeightMax={160}>
              {searchResults.map((item, i) => (
                <li
                  onMouseDown={e => handleSelect(e, item)}
                  key={i}
                  tabIndex={i}
                  className={cx(styles["list-item"], {
                    [styles.selected]: currentItem === i
                  })}
                  ref={li => {
                    itemsRefs.push(li);
                  }}
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
  const [category, setCategory] = useState("");
  const [provider, setProvider] = useState("");
  const [error, setError] = useState(null);
  const { handleSearch, searchResults } = useSearchEngine();

  const { single_payment } = payment;

  useEffect(() => {
    handleSearch(category);
  }, [category]);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "category") setCategory(value);
    if (name === "provider") setProvider(value);
    if (value && name === "category") setError(false);
  }

  function handleForward() {
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
    <div className={styles["full-space-container"]}>
      {single_payment ? (
        <SinglePaymentView handleChange={handleChange} error={error} />
      ) : (
        <MonthlyPaymentView
          handleChange={handleChange}
          error={error}
          searchResults={searchResults}
          setCategory={setCategory}
          category={category}
        />
      )}
      <Navigation
        handleBackward={() => setIndex(0)}
        handleForward={handleForward}
      />
    </div>
  );
};
