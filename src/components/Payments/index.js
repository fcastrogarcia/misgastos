import React from "react";
import styles from "./Index.module.scss";
import cx from "classnames";

import ScheduleSelector from "./ScheduleSelector";
import Table from "./Table";
import Modal from "./Payment-Modal";

import usePayments from "./usePayments";

const Payments = () => {
  const { isModalOpen, toggleModal, payments, loading } = usePayments();

  return (
    <div className={styles.container}>
      <h3 className={cx(styles.title, "section-heading")}>Pagos</h3>
      <ScheduleSelector />
      <Table data={payments} loading={loading} />
      {isModalOpen && <Modal isOpen={isModalOpen} toggle={toggleModal} />}
    </div>
  );
};

export default Payments;
