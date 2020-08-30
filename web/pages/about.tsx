import React from "react";
import Head from "next/head";
import NextLink from "next/link";

import Stack from "../components/ui/layouts/stack";
import Cluster from "../components/ui/layouts/cluster";
import Separator from "../components/ui/separator";
import HeadlineText from "../components/ui/headline-text";
import BodyText from "../components/ui/body-text";
import Link from "../components/ui/link";
import { getHeadTitle } from "../utils/head-title";
import styles from "./about.module.scss";

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>{getHeadTitle("About")}</title>
      </Head>

      <Stack scale="8">
        <Stack scale="2">
          <HeadlineText level="1">About the project</HeadlineText>
          <BodyText>
            IT Dog is a media portal about the IT industry in Germany. It drives
            transparency in the market offering{" "}
            <NextLink href="/">
              <Link>news and reports</Link>
            </NextLink>
            ,{" "}
            <NextLink href="/salaries">
              <Link>salary insights</Link>
            </NextLink>{" "}
            since 2020.
          </BodyText>
        </Stack>

        <Separator />

        <Cluster scale="4">
          <div>
            <Stack scale="8" className={styles.teamSection}>
              <HeadlineText level="2">Our team</HeadlineText>

              <Stack scale="4">
                <Stack scale="1">
                  <HeadlineText level="3">Project Founder</HeadlineText>
                  <BodyText>Dzmitry Bayrchyk</BodyText>
                </Stack>

                <Stack scale="1">
                  <HeadlineText level="3">QA Engineer</HeadlineText>
                  <BodyText>Olga Benchuk</BodyText>
                </Stack>
              </Stack>
            </Stack>

            <div className={styles.teamIllustrationContainer}>
              <img
                className={styles.teamIllustration}
                src="/team-spirit.svg"
                alt=""
              />
            </div>
          </div>
        </Cluster>
      </Stack>
    </>
  );
};

export default AboutPage;
