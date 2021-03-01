import Head from 'next/head';
import { GetServerSideProps } from 'next';

import ExperienceBar from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from '../contexts/ChallengeContext';
import { LoginContext, LoginProvider } from '../contexts/LoginContext';
import { useContext } from 'react';
import { LogoutButton } from '../components/LogoutButton';

export default function Main(props) {

  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Home | Move.it</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <LoginProvider>
                <Profile />
              </LoginProvider>
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>

        <LoginProvider>
          <LogoutButton />
        </LoginProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
