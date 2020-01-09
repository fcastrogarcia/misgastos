import React, { useState, useEffect } from "react";
import styles from "./Main.module.scss";
import Payments from "../Payments/index";

export default ({ section }) => {
  return (
    <React.Fragment>
      <main>{section === "payments" && <Payments />}</main>
    </React.Fragment>
  );
};
