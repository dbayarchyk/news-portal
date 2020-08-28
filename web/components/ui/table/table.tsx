import React from "react";

import styles from "./table.module.scss";

const Table: React.FC = ({ children }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>{children}</table>
    </div>
  );
};

export default Table;
