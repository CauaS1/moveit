import { createContext, ReactNode, useEffect, useState } from "react";
import firebase from 'firebase';
import { useRouter } from 'next/router';

interface LoginProviderProps {
  children: ReactNode;
}

interface LoginContextData {
  displayName: string;
  photoURL: string;
  githubLogin: () => void;
  logoutCurrentUser: () => void;
}

export const LoginContext = createContext({} as LoginContextData);

export function LoginProvider({ children }: LoginProviderProps) {
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const router = useRouter();

  function githubLogin() {
    var provider = new firebase.auth.GithubAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        router.push('/main');
      })
      .catch(err => {
        console.log(err);
      })
  }

  function getCurrentUser() {
    var user = firebase.auth().currentUser;
    if (user != null) {
      setDisplayName(user.displayName);
      setPhotoURL(user.photoURL);
    } else {
      router.push('/');
    }
  }

  function logoutCurrentUser() {
    firebase.auth().signOut().then(() => {
      console.log('Singout with success!');
      router.push('/');
    }).catch(err => console.log('Error! ' + err))
  } 

  useEffect(() => {
    getCurrentUser();
  }, [])

  return (
    <LoginContext.Provider value={{
      githubLogin,
      photoURL,
      displayName,
      logoutCurrentUser
    }}>
      {children}
    </LoginContext.Provider>
  )
}