import { createContext, ReactNode, useState } from "react";
import firebase from 'firebase';
import { useRouter } from 'next/router';

interface LoginProviderProps {
  children: ReactNode;
}

interface LoginContextData {
  displayName: string;
  photoURL: string;
  githubLogin: () => void;
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
      .then(result => {
        var user = result.user;

        user.providerData.map(data => {
          setDisplayName(data.displayName);
          setPhotoURL(data.photoURL);
        })

        router.push('/main');
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <LoginContext.Provider value={{
      githubLogin,
      photoURL,
      displayName
    }}>
      {children}
    </LoginContext.Provider>
  )
}