import React from "react";
import styles from "./Table.module.scss";

import Dropdown from "../shared/Dropdown";
import { FiDollarSign, FiEdit2 } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

import usePayments from "./usePayments";
import useAuthAndFirebase from "../../context/useAuthAndFirebase";

const Menu = ({ id, closeMenu }) => {
  const { setPaymentId, toggleModal, payments } = usePayments();
  const { firebase } = useAuthAndFirebase();

  function doRegisterPayment() {
    closeMenu();
    setPaymentId(id);
    toggleModal(true);
  }

  function doDeletePayment() {
    firebase.deletePayment(id).finally(() => closeMenu());
  }

  const items = [
    {
      label: "Ingresar pago",
      icon: styles => <FiDollarSign className={styles.icon} />,
      clickHandler: doRegisterPayment
    },
    {
      label: "Eliminar",
      icon: styles => <FaRegTrashAlt className={styles.icon} />,
      clickHandler: doDeletePayment
    },
    {
      label: "Editar",
      icon: styles => <FiEdit2 className={styles.icon} />,
      clickHandler: null
    }
  ];

  const hasAutomaticPayment = payments[id].automatic_payment;

  const i = items.filter((_, index) => index !== 0);

  return (
    <Dropdown items={hasAutomaticPayment ? i : items} style={styles.menu} />
  );
};

export default Menu;
