import React, { useEffect, useState } from "react";

import SinglePaymentInput from "./Category-sp";
import MonthlyPaymentInput from "./Category-mp";

import useSearchEngine from "./useSearchEngine";

const Category = ({ payment, setPayment }) => {
  const [error, setError] = useState(null);
  const { handleSearch, searchResults } = useSearchEngine();

  const { single_payment, category } = payment;

  useEffect(() => {
    handleSearch(category);
  }, [category]);

  function handleChange(e) {
    const { name, value } = e.target;
    const newData = { [name]: value };
    setPayment(newData);
  }

  return (
    <div>
      <h3 className="section-subheading">
        Ingresá el nombre del pago o servicio
      </h3>
      {single_payment ? (
        <SinglePaymentInput error={error} handleChange={handleChange} />
      ) : (
        <MonthlyPaymentInput
          error={error}
          category={category}
          handleChange={handleChange}
          searchResults={searchResults}
          setPayment={setPayment}
        />
      )}
    </div>
  );
};

export default Category;
