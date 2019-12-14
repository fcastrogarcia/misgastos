import React, { useState, useEffect } from "react";
import styles from "./Modal.module.scss";
import SwipeableViews from "react-swipeable-views";
import View1 from "./Views/View.1";
import View2 from "./Views/View.2";
import View3 from "./Views/View.3";
import View4 from "./Views/View.4";

export default ({ open, setOpen, payment, setPayment, index, setIndex }) => {
  const [shouldRender, setRender] = useState(open);

  useEffect(() => {
    if (open) setRender(true);
  }, [open]);

  const onAnimationEnd = () => {
    if (!open) setRender(false);
  };

  const containerStyle = { height: "100%", width: "100%" };
  const swipeableStyle = { height: "100%", width: "100%", overflow: "hidden" };
  const animationStyle = { animation: `${open ? "fadeIn" : "fadeOut"} .2s` };

  console.log(payment);

  return (
    shouldRender && (
      <div
        className={styles.background}
        style={animationStyle}
        onAnimationEnd={onAnimationEnd}
      >
        <div className={styles.modal}>
          <SwipeableViews
            containerStyle={containerStyle}
            style={swipeableStyle}
            index={index}
            disabled
          >
            <View1 {...{ setPayment, setIndex }} />
            <View2 {...{ payment, setPayment, setIndex }} />
            <View3 {...{ payment, setPayment, setIndex }} />
            <View4 {...{ payment, setPayment, setOpen, setIndex }} />
          </SwipeableViews>
        </div>
      </div>
    )
  );
};