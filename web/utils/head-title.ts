const WEBSITE_NAME = "IT Dog";

export const getHeadTitle = (title?: string): string => {
  return title ? `${title} | ${WEBSITE_NAME}` : WEBSITE_NAME;
};
