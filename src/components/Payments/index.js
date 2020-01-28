import React from "react";
import styles from "./Index.module.scss";
import cx from "classnames";

import CreateButton from "../shared/CreateButton";
import ScheduleSelector from "./ScheduleSelector";
import SelectedMonth from "./SelectedMonth";
import Table from "./Table";
import Modal from "./Payment-Modal";

import { Provider as PaymentsProvider } from "../../context/PaymentsContext";
import usePayments from "./usePayments";

const Payments = () => {
  const { isModalOpen, toggleModal, payments } = usePayments();

  return (
    <div className={styles.container}>
      <CreateButton path="/main/new-payment" text="Pago" />
      <h3 className={cx(styles.title, "section-heading", "uppercase")}>
        pagos
      </h3>
      <ScheduleSelector />
      <SelectedMonth />
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
