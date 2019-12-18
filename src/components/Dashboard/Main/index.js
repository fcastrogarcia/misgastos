import React, { useState, useEffect } from "react";
import styles from "./Main.module.scss";
import Payments from "../Payments/index";

export default () => {
  return (
    <React.Fragment>
      <main>
        <Payments />
      </main>
    </React.Fragment>
  );
};
