import React from "react";
import Layout from "../Layout/Layout";
import Main from "./Main/index";
import Sidebar from "./Sidebar/index";
import SettingsBar from "./SettingsBar/index";
import Modal from "./Modal/index";

const Dashboard = () => {
  return (
    <Layout>
      <SettingsBar />
      <Sidebar />
      <Main />
      <Modal />
    </Layout>
  );
};

export default Dashboard;
