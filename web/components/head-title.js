import React from "react";

const WEBSITE_NAME = "IT Dog";

function HeadTitle({ children }) {
  return (
    <title>{children ? `${children} | ${WEBSITE_NAME}` : WEBSITE_NAME}</title>
  );
}

export default HeadTitle;
