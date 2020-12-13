import React, { useRef, useState, useEffect } from "react";

import Header from "./header";
import NavBar from "./nav-bar";
import Footer from "./footer";
import Container from "./ui/layouts/container";
import Stack from "./ui/layouts/stack";
import styles from "./site-layout.module.scss";

const SiteLayout: React.FC = ({ children }) => {
  const scrollToTopQualifierRef = useRef<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement>();
  const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);

  useEffect(() => {
    if (
      typeof IntersectionObserver !== "function" ||
      !scrollToTopQualifierRef.current
    ) {
      return;
    }

    const observer = new IntersectionObserver((records) => {
      for (const record of records) {
        if (record.isIntersecting) {
          setIsScrollToTopVisible(false);
        } else {
          setIsScrollToTopVisible(true);
        }
      }
    });

    observer.observe(scrollToTopQualifierRef.current);

    return () => {
      observer.unobserve(scrollToTopQualifierRef.current);
    };
  }, []);

  const handleScrollToTopClick = isScrollToTopVisible ? 
    () => {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    : undefined;

  return (
    <div className={styles.container} ref={containerRef}>
      <Header />
      <div ref={scrollToTopQualifierRef} />
      <Stack scale="8">
        <NavBar />
        <main>
          <Container>{children}</Container>
        </main>
      </Stack>
      <Footer
        className={styles.footer}
        onScrollToTopClick={handleScrollToTopClick}
      />
    </div>
  );
};

export default SiteLayout;
