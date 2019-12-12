import React from "react";
import GoogleButton from "react-google-button";
import styles from "./SignIn.module.scss";

export default ({ clickHandler }) => {
  const { wrapper, title, card, form, input, label, field } = styles;
  return (
    <div className={wrapper}>
      <h1 className={title}>Keep account of your expenses.</h1>
      <div className={card}>
        <form className={form}>
          <div className={field}>
            <label className={label} htmlFor="email">
              Email
            </label>
            <input className={input} name="email" type="text"></input>
          </div>
          <div className={field}>
            <label className={label} htmlFor="password">
              Password
            </label>
            <input className={input} name="password" type="password"></input>
          </div>
        </form>
        <GoogleButton
          onClick={clickHandler}
          style={{ margin: "1em", gridArea: "google" }}
        />
      </div>
    </div>
  );
};
