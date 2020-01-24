import React from "react";
import styles from "./Index.module.scss";

import CreateButton from "../../shared/CreateButton";
import ScheduleSelector from "./ScheduleSelector";
import Table from "./Table";
import Modal from "./Payment-Modal";

import { Provider as PaymentsProvider } from "../../Context/PaymentsContext";
import usePayments from "./usePayments";

const Payments = () => {
  const { isModalOpen, toggleModal, payments } = usePayments();

  return (
    <div className={styles.container}>
      <CreateButton path="/main/new-payment" />
      <ScheduleSelector />
      <Table data={payments} />
      {isModalOpen && <Modal isOpen={isModalOpen} toggle={toggleModal} />}
    </div>
  );
};

export default () => (
  <PaymentsProvider>
    <Payments />
  </PaymentsProvider>
);
