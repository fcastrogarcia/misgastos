import React, { createContext, useState, useEffect } from "react";

import { getMonthAndYear } from "../utils/time";
import useAuthAndFirebase from "./useAuthAndFirebase";

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
  const [menu, toggleMenu] = useState(null);

  const { firebase, auth } = useAuthAndFirebase();

  function updateTime(payload) {
    const nextState = { ...time };
    const keys = Object.keys(payload);
    keys.forEach(key => (nextState[key] = payload[key]));
    setTime(nextState);
  }

  useEffect(() => {
    if (auth.uid) {
      let cleanUp = firebase
        .payments()
        .where("userId", "==", auth.uid)
        .onSnapshot(snapshot => {
          const data = {};
          snapshot.forEach(doc => (data[doc.id] = doc.data()));
          if (data) setPayments(data);
        });
      return () => cleanUp();
    }
  }, [auth, auth.uid, firebase]);

  useEffect(() => {
    const nextState = getMonthAndYear(new Date());
    updateTime(nextState);
  }, []);

  console.log("time", time);

  const value = {
    payments,
    time,
    updateTime,
    isModalOpen,
    toggleModal,
    paymentId,
    setPaymentId,
    menu,
    toggleMenu
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
