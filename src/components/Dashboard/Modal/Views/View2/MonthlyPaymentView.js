import React, { useState } from "react";
import cx from "classnames";
import styles from "../View.module.scss";
import { Scrollbars } from "react-custom-scrollbars";
import { FaCaretDown, FaTimes } from "react-icons/fa";

export default ({
  error,
  handleChange,
  searchResults,
  setCategory,
  category
}) => {
  const [showSearchList, setSearchList] = useState(false);
  const [currentItem, setCurrentItem] = useState(-1);
  const itemsRefs = [];

  function handleSelect(_, item) {
    setCategory(item);
  }

  function handleDelete() {
    setCategory("");
  }

  function handleCaret() {
    setSearchList(!showSearchList);
    setCurrentItem(-1);
  }

  function handleBlur() {
    setSearchList(false);
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
            onFocus={() => setSearchList(true)}
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
        {showSearchList && searchResults.length > 0 && (
          <ul className={styles["dropdown-list"]}>
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
        <label className={styles.label} htmlFor="provider">
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
