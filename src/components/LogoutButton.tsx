import { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import styles from '../styles/components/LogoutButton.module.css';

export function LogoutButton() {
  const { logoutCurrentUser } = useContext(LoginContext);

  return (
    <>
      <button className={styles.logoutButton}
        onClick={logoutCurrentUser}
      >
        Logout
      </button>
    </>
  )
}