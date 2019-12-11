import React from "react";
import Layout from "../Layout/Layout";
import Main from "./Main/index";
import Sidebar from "./Sidebar/index";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <Sidebar></Sidebar>
        <Main />
      </div>
    </Layout>
  );
};

export default Dashboard;
