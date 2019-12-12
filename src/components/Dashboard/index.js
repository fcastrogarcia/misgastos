import React, { useState } from "react";
import Layout from "../Layout/Layout";
import Main from "./Main/index";
import Sidebar from "./Sidebar/index";
import SettingsBar from "./SettingsBar/index";
import Modal from "./Modal/index";
import Fab from "./Modal/Fab";

const Dashboard = () => {
  const initialState = {
    single_payment: null,
    category: null,
    provider: null,
    due_date: null,
    amount: null,
    months_paid: []
  };
  const [payment, setPayment] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <Layout>
      <SettingsBar />
      <Sidebar />
      <Main />
      <Fab {...{ open, setOpen, setPayment, setIndex }} />
      <Modal {...{ open, setOpen, payment, setPayment, index, setIndex }} />
    </Layout>
  );
};

export default Dashboard;
