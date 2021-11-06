import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import {
  signOut,
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const initializeFirebaseAuth = () => {
  const app = initializeApp(firebaseConfig);
};

// Google sign in
export const handleGoogleSignIn = () => {
  const gProvider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, gProvider)
    .then((result) => {
      const { photoURL, displayName, email } = result;
      const loggedInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        img: photoURL,
      };
      return loggedInUser;
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

// GitHub sign in
export const handleGithubSignIn = () => {
  const ghProvider = new GithubAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, ghProvider)
    .then((result) => {
      const user = result.user;
      const { photoURL, displayName, email } = result;
      const loggedInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        img: photoURL,
      };
      return loggedInUser;
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

// sign out

export const handleSignOut = () => {
  const auth = getAuth();
  return signOut(auth)
    .then(() => {
      const signOutUser = {
        isSignIn: false,
        name: "",
        email: "",
        img: "",
      };
      return signOutUser;
    })
    .catch((error) => {
      // An error happened.
    });
};

// SignIn with email and password
export const signinWithEmailAndPassword = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const { photoURL, displayName, email } = user;
      const loggedInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        img: photoURL,
      };
      return loggedInUser;
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

// Update user name and password
