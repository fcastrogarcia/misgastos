import React, { useEffect } from "react";

import SinglePaymentInput from "./Category-sp";
import MonthlyPaymentInput from "./Category-mp";

import useSearchEngine from "./useSearchEngine";

const Category = ({ payment, setPayment, errors, doValidateInput }) => {
  const { handleSearch, searchResults } = useSearchEngine();

  const { single_payment, category } = payment;

  useEffect(() => {
    handleSearch(category);
  }, [category]);

  function handleChange(e) {
    const { name, value } = e.target;
    const payload = { [name]: value };
    if (name === "category") doValidateInput(payload);
    setPayment(payload);
  }

  return (
    <div>
      <h3 className="section-subheading">
        Ingresá el nombre del pago o servicio
      </h3>
      {single_payment ? (
        <SinglePaymentInput errors={errors} handleChange={handleChange} />
      ) : (
        <MonthlyPaymentInput
          errors={errors}
          handleChange={handleChange}
          category={category}
          searchResults={searchResults}
          setPayment={setPayment}
          doValidateInput={doValidateInput}
        />
      )}
    </div>
  );
};

export default Category;
