import React from "react";

const WEBSITE_NAME = "IT Dog";

interface HeadTitleProps {
  title?: string;
}

const HeadTitle: React.FC<HeadTitleProps> = ({ title }) => {
  return <title>{title ? `${title} | ${WEBSITE_NAME}` : WEBSITE_NAME}</title>;
};

export default HeadTitle;
