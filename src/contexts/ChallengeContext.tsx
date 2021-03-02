import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import firebase from 'firebase';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModa';
import { db } from '../database/db';

interface ChallengesProviderProps {
  children: ReactNode;

  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number,
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void; //Type for function where the return is null.
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completedChallenge: () => void;
  closeLevelUpModal: () => void;
  getUserLevel: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest //a obje where within there is level, currExperience and chCompleted
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
    getUserLevel();
    // addData();
  }, []);

  useEffect(() => { //set the cookies, they need to be a STRING!!
    if(level != 0 || currentExperience != 0 || challengesCompleted != 0) {
      updateValues();
    }

    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));

    console.log('Updated!!!!!!!!');
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge);

    new Audio('./notification.mp3').play(); //everything that is inside "public" folder don't need to do something like this "../../..."

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount} xp`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completedChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  async function addData() {
    const user = await firebase.auth().currentUser.uid;

    db.collection('level').doc(user).set({
      level: 0,
      currentExperience: 0,
      challengesCompleted: 0,
    });
  }

  async function getUserLevel() {
    const userId = firebase.auth().currentUser.uid;
    await db.collection('level').doc(userId).get().then((doc => {
      const userData = doc.data();
      console.log(userData);
      setLevel(userData.level);
      setChallengesCompleted(userData.challengesCompleted);
      setCurrentExperience(userData.currentExperience);
    }))
  }

  function updateValues() {
    const userId = firebase.auth().currentUser.uid;

    db.collection('level').doc(userId).update({
      level: rest.level,
      currentExperience: rest.currentExperience,
      challengesCompleted: rest.challengesCompleted
    });
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completedChallenge,
        closeLevelUpModal,
        getUserLevel
      }}>
      {children}

      {isLevelModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}