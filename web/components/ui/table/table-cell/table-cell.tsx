import React from "react";

import styles from "./table-cell.module.scss";

type TableCellProps = {
  as: "th" | "td";
  className?: string;
  align: "left" | "center" | "right";
};

const TableCell: React.FC<TableCellProps> = ({
  as,
  className,
  align,
  children,
}) => {
  const element = React.createElement(as, {
    className: [className, styles.tableCell].join(" "),
    children: (
      <div className={[styles.content, styles[align]].join(" ")}>
        {children}
      </div>
    ),
  });

  return element;
};

export default TableCell;
