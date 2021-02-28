import firebase from 'firebase';
import 'firebase/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDVJgORzj6LKNukG1TkKdtE08hb6wxbGpU",
    authDomain: "moveit-a3d2d.firebaseapp.com",
    projectId: "moveit-a3d2d",
  });
} else {
  firebase.app(); // if already initialized, use that one
}

export const db = firebase.firestore();