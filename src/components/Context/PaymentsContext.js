import React, { createContext, useState, useEffect } from "react";

import { getCurrentTime } from "../../utils/time";
import useAuthAndFirebase from "./useCombinedContexts";

const Context = createContext();

const timeInitialState = {
  month: null,
  year: null
};

const Provider = ({ children }) => {
  const [payments, setPayments] = useState({});
  const [paymentId, setPaymentId] = useState(null);
  const [time, setTime] = useState(timeInitialState);
  const [isModalOpen, toggleModal] = useState(false);

  const { firebase, auth } = useAuthAndFirebase();

  function updateTime(payload) {
    const nextState = { ...time };
    const keys = Object.keys(payload);
    keys.forEach(key => (nextState[key] = payload[key]));
    setTime(nextState);
  }

  useEffect(() => {
    if (auth.uid) {
      firebase
        .payments()
        .where("userId", "==", auth.uid)
        .get()
        .then(querySnapshot => {
          let data = {};
          querySnapshot.docs.forEach(doc => (data[doc.id] = doc.data()));
          if (data) setPayments(data);
        });
    }
  }, [auth, auth.uid, firebase]);

  useEffect(() => {
    const payload = getCurrentTime();
    updateTime(payload);
  }, []);

  console.log("time", time);

  const value = {
    payments,
    time,
    updateTime,
    isModalOpen,
    toggleModal,
    paymentId,
    setPaymentId
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
