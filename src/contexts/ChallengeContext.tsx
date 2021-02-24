import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

interface ChallengesProviderProps {
  children: ReactNode;
}

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  ammount: number;
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
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex];
    console.log(challenge)
    setActiveChallenge(challenge)
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completedChallenge() { //This is just text, isn't from the class
    return setChallengesCompleted(challengesCompleted + 1);
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
        completedChallenge
      }}>
      {children}
    </ChallengesContext.Provider>
  )
}