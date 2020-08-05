import React from "react";

const WEBSITE_NAME = "IT Dog";

interface HeadTitleProps {
  children?: string;
}

const HeadTitle: React.FC<HeadTitleProps> = ({ children }) => {
  return (
    <title>{children ? `${children} | ${WEBSITE_NAME}` : WEBSITE_NAME}</title>
  );
};

export default HeadTitle;
