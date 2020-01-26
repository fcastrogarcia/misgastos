import React from "react";
import styles from "./Table.module.scss";

import Dropdown from "../shared/Dropdown";
import { FiDollarSign, FiEdit2 } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

import usePayments from "./usePayments";

const Menu = ({ id, closeMenu }) => {
  const { setPaymentId, toggleModal } = usePayments();

  function doRegisterPayment() {
    closeMenu();
    setPaymentId(id);
    toggleModal(true);
  }

  const items = [
    {
      label: "Registrar Pago",
      icon: styles => <FiDollarSign className={styles.icon} />,
      clickHandler: doRegisterPayment
    },
    {
      label: "Eliminar",
      icon: styles => <FaRegTrashAlt className={styles.icon} />,
      clickHandler: null
    },
    {
      label: "Editar",
      icon: styles => <FiEdit2 className={styles.icon} />,
      clickHandler: null
    }
  ];

  return <Dropdown items={items} style={styles.menu} />;
};

export default Menu;