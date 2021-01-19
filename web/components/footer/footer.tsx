import React from "react";

import Container from "../ui/layouts/container";
import Center from "../ui/layouts/center";
import Stack from "../ui/layouts/stack";
import BodyText from "../ui/body-text"
import styles from "./footer.module.scss";

type FooterProps = {
  className?: string;
  onScrollToTopClick?: () => void;
};

const Footer: React.FC<FooterProps> = ({
  className,
  onScrollToTopClick,
}) => {
  return (
    <footer className={className}>
      <Container>
        <Stack scale="2">
          {onScrollToTopClick ? (
            <Center>
              <button
                className={styles.scrollToTopButton}
                type="button"
                onClick={onScrollToTopClick}
              >
                Scroll to the top ☝
              </button>
            </Center>
          ) : null}

          <div className={styles.footerContent}>
            <Stack scale="1">
              <BodyText type="secondary">
                IT Dog Copyright© 2021
              </BodyText>
            </Stack>
          </div>
        </Stack>
      </Container>
    </footer>
  );
};

export default Footer;
