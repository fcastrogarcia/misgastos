import React, { useState } from "react";
import Layout from "../Layout/Layout";
import Main from "./Main/index";
import Sidebar from "./Sidebar/index";
import SettingsBar from "./SettingsBar/index";
import Modal from "./Modal/index";

const Dashboard = () => {
  const [section, setSection] = useState("payments");

  return (
    <Layout>
      {/* <SettingsBar /> */}
      <Sidebar setSection={setSection} />
      <Main section={section} />
      <Modal />
    </Layout>
  );
};

export default Dashboard;
