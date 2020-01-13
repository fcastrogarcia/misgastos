import React, { useState } from "react";
import cx from "classnames";
import styles from "../../styles/inputs.module.scss";

import { Scrollbars } from "react-custom-scrollbars";
import { FaCaretDown, FaTimes } from "react-icons/fa";

const MonthlyPaymentInput = props => {
  const { error, handleChange, searchResults, category, setPayment } = props;

  const [showSearchList, setSearchList] = useState(false);
  const [currentItem, setCurrentItem] = useState(-1);
  const itemsRefs = [];

  const hasSearchResults = searchResults.length > 0;

  const setCategory = payload => setPayment({ category: payload });

  const doSelectSearchItem = (_, item) => setCategory(item);

  function doClearInput(e) {
    e.preventDefault();
    setCategory("");
  }

  function doOpenSearchList() {
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
      setCurrentItem(i => i + 1);
      currentItem > 2 && itemsRefs[currentItem + 1].scrollIntoView(false);
    }

    if (key === 38 && currentItem > -1) {
      setCurrentItem(i => i - 1);
      currentItem > 0 && itemsRefs[currentItem - 1].scrollIntoView();
    }

    if (
      key === 13 &&
      searchResults.length - 1 > currentItem &&
      currentItem > -1
    ) {
      setCategory(searchResults[currentItem]);
    }

    if (key === 27) setSearchList(false);
  }

  return (
    <React.Fragment>
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
              <FaTimes className={styles.clear} onClick={doClearInput} />
            )}
            <FaCaretDown className={styles.caret} onClick={doOpenSearchList} />
          </span>
        </div>
        {showSearchList && hasSearchResults && (
          <ul className={styles["dropdown-list"]}>
            <Scrollbars autoHeight autoHeightMax={160}>
              {searchResults.map((item, i) => (
                <li
                  onMouseDown={e => doSelectSearchItem(e, item)}
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
      <div className={cx(styles["flex-container"], styles["extra-margin-top"])}>
        <h3 className="section-subheading" htmlFor="provider">
          Ingresá el proveedor (opcional)
        </h3>
        <input
          className={styles.input}
          name="provider"
          type="text"
          placeholder="Ej.: Fibertel"
          autoComplete="off"
          onChange={handleChange}
        ></input>
      </div>
    </React.Fragment>
  );
};

export default MonthlyPaymentInput;
