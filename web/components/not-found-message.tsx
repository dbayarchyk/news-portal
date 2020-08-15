import React from "react";

import HeadlineText from "./ui/headline-text";
import BodyText from "./ui/body-text";
import styles from "./not-found-message.module.scss";

const NotFoundMessage: React.FC = () => {
  return (
    <section className={styles.container}>
      <HeadlineText level="1">404</HeadlineText>
      <BodyText>This page could not be found</BodyText>
    </section>
  );
};

export default NotFoundMessage;
