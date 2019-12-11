import React, { useState, useReducer } from "react";
import styles from "./Modal.module.scss";
import SwipeableViews from "react-swipeable-views";
import View1 from "./Views/View.1";
import View2 from "./Views/View.2";
import View3 from "./Views/View.3";
import View4 from "./Views/View.4";

export default ({ open, setOpen }) => {
  const initialState = {
    singlePayment: null,
    category: "",
    date: null,
    amount: null
  };

  const [expense, setExpense] = useState(initialState);
  const [index, setIndex] = useState(0);

  const containerStyle = { height: "100%", width: "100%" };
  const swipeableStyle = { height: "100%", width: "100%", overflow: "hidden" };
  console.log(expense);
  console.log("index: ", index);

  return (
    open && (
      <div className={styles.background}>
        <div className={styles.modal}>
          <SwipeableViews
            containerStyle={containerStyle}
            style={swipeableStyle}
            index={index}
            // disabled
            enableMouseEvents
          >
            <View1
              setIndex={setIndex}
              expense={expense}
              setExpense={setExpense}
            />
            <View2
              setIndex={setIndex}
              expense={expense}
              setExpense={setExpense}
            />
            <View3
              setIndex={setIndex}
              expense={expense}
              setExpense={setExpense}
            />
            <View4
              setIndex={setIndex}
              expense={expense}
              setExpense={setExpense}
            />
          </SwipeableViews>
        </div>
      </div>
    )
  );
};
