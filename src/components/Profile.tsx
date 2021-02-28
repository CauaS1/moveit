import { useContext, useEffect } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import { LoginContext } from '../contexts/LoginContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);
  const { displayName, photoURL } = useContext(LoginContext);

  return (
    <div className={styles.profileContainer}>
      <img src={photoURL} alt="Avatar" />
    
      <div>
        <strong>{displayName}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}