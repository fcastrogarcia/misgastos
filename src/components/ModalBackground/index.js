import React, { useState, useEffect } from "react";
import styles from "./ModalBackground.module.scss";

export default ({ isOpen, children }) => {
  const [shouldRender, setRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setRender(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setRender(false);
  };

  const animationStyle = { animation: `${isOpen ? "fadeIn" : "fadeOut"} .2s` };

  return (
    shouldRender && (
      <div
        className={styles.background}
        style={animationStyle}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
      </div>
    )
  );
};
