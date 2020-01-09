import React, { useState, useEffect } from "react";
import styles from "./Checkbox.module.scss";
import cx from "classnames";

export default ({ data }) => {
  const [checked, setChecked] = useState(false);

  function handleChange(e) {
    setChecked(!checked);
  }

  return (
    <React.Fragment>
      <input type="checkbox" checked={checked} onChange={handleChange} />
    </React.Fragment>
  );
};
