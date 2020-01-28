import { useState } from "react";

export const categories = [
  "Internet",
  "Gas",
  "Luz",
  "Teléfono celular",
  "Teléfono fijo",
  "Agua",
  "Alquiler",
  "ABL",
  "Netflix",
  "Spotify",
  "Tarjeta de crédito"
].sort();

export default () => {
  const [searchResults, setResults] = useState(categories);
  let currentList = [];
  let newList = [];

  const normalize = value =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  function handleSearch(value) {
    if (value) {
      currentList = categories;
      newList = currentList.filter(item => {
        const normalizedItem = normalize(item);
        const normalizedValue = normalize(value);
        return normalizedItem.includes(normalizedValue);
      });
      setResults(newList);
    } else {
      setResults(categories);
    }
  }

  return { handleSearch, searchResults };
};
