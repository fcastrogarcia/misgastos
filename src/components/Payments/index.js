import React from "react";
import styles from "./Index.module.scss";
import cx from "classnames";

import ScheduleSelector from "./ScheduleSelector";
import Table from "./Table";
import Modal from "./Payment-Modal";
import Footer from "./components/Footer/Index";

import usePayments from "./usePayments";
import { shouldPaymentRender, getPaymentStatus } from "./utils";

const Payments = () => {
  const {
    isModalOpen,
    toggleModal,
    payments: initialPayments,
    loading,
    time,
  } = usePayments();

  const ids = Object.keys(initialPayments);
  const payments = Object.values(initialPayments);
  const statusArr = payments.map((payment) => getPaymentStatus(payment, time));
  const shouldPaymentsRender = payments.map((payment) =>
    shouldPaymentRender(payment, time)
  );
  const renderPayments = payments.map((item, index) => {
    return {
      ...item,
      id: ids[index],
      status: statusArr[index],
      shouldRender: shouldPaymentsRender[index],
    };
  });

  const noPayments = !shouldPaymentsRender.length && !loading;

  return (
    <div className={styles.container}>
      <h3 className={cx(styles.title, "section-heading")}>Pagos</h3>
      <ScheduleSelector />
      <Table
        payments={renderPayments}
        loading={loading}
        noPayments={noPayments}
      />
      {isModalOpen && <Modal isOpen={isModalOpen} toggle={toggleModal} />}
      {!loading && <Footer payments={renderPayments} />}
    </div>
  );
};

export default Payments;
