import React, { useState, useEffect } from "react";
import styles from "../View.module.scss";
import SinglePaymentView from "./SinglePaymentView";
import MonthlyPaymentView from "./MonthlyPaymentView";
import Navigation from "../../Navigation";
import useSearchEngine from "../../useSearchEngine";

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
