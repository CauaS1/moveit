import { useContext, useEffect } from 'react';
import firebase from 'firebase';

import styles from '../styles/pages/Login.module.css';
import { LoginContext } from '../contexts/LoginContext';

export function Login() {
  const { githubLogin } = useContext(LoginContext);
    function firebaseStart() {
    var firebaseConfig = {
      apiKey: "AIzaSyDVJgORzj6LKNukG1TkKdtE08hb6wxbGpU",
      authDomain: "moveit-a3d2d.firebaseapp.com",
      projectId: "moveit-a3d2d",
      storageBucket: "moveit-a3d2d.appspot.com",
      messagingSenderId: "722183579304",
      appId: "1:722183579304:web:777df7abb19ad37edd449d",
      measurementId: "G-4PHP3XK4HD"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    };
  }

  useEffect(() => {
    firebaseStart();
  })

  return (
    <div className={styles.loginContainer}>
      <div>
        <img src="/icons/logo.svg" alt="Logo" />

        <h2>Bem-vindo</h2>
        <p>
          <img src="/icons/github.svg" alt="Github Icon" />
          Faça o login com seu Github <br />
          para começar
        </p>

        <button onClick={githubLogin} >
          Clique no botão para começar
          <img src="/icons/right-arrow.svg" alt="Seta" />
        </button>

      </div>
    </div>
  )
}