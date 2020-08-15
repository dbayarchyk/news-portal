import React from "react";

import HeadlineText from "./headline-text";
import BodyText from "./body-text";
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
