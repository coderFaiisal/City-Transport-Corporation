import { initializeApp } from "firebase/app";
import firebaseConfig from "../Login/firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";

const app = initializeApp(firebaseConfig);

const Register = () => {
  const [user, setUser] = useContext(UserContext);
  console.log(user);
  const ghProvider = new GithubAuthProvider();
  const gProvider = new GoogleAuthProvider();

  // GitHub sign in
  const handleGithubSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, ghProvider)
      .then((result) => {
        const user = result.user;
        const { photoURL, displayName, email } = result;
        setUser({
          isSignIn: true,
          name: displayName,
          email: email,
          img: photoURL,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  // Google sign in
  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, gProvider)
      .then((result) => {
        const user = result.user;
        const { photoURL, displayName, email } = result;
        setUser({
          isSignIn: true,
          name: displayName,
          email: email,
          img: photoURL,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPassValid = e.target.value.length > 6;
      const isPassHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPassValid && isPassHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.email && user.password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const user = userCredential.user;
          const { photoURL, displayName, email } = user;
          setUser({
            isSignIn: true,
            name: displayName,
            email: email,
            img: photoURL,
          });
          updateUserName(displayName);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
    e.target.reset();
  };

  const updateUserName = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then((res) => {
        setUser({});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login">
      <div>
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit}>
          <input
            onBlur={handleBlur}
            type="text"
            name="name"
            placeholder="Name"
            required
          />
          <br />
          <input
            onBlur={handleBlur}
            type="text"
            name="email"
            placeholder="Email "
            required
          />
          <br />
          <input
            onBlur={handleBlur}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <br />
          <input type="submit" value="Create an account" />
        </form>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
      <div>
        <button onClick={handleGithubSignIn}>Continue with Github</button>
        <br />
        <button onClick={handleGoogleSignIn}>Continue with Google</button>
      </div>
    </div>
  );
};

export default Register;
