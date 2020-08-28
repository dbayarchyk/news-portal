import React from "react";

import styles from "./table-cell.module.scss";

type TableCellProps = {
  as: "th" | "td";
  align: "left" | "center" | "right";
};

const TableCell: React.FC<TableCellProps> = ({ as, align, children }) => {
  const element = React.createElement(as, {
    className: styles.tableCell,
    children: (
      <div className={[styles.content, styles[align]].join(" ")}>
        {children}
      </div>
    ),
  });

  return element;
};

export default TableCell;
