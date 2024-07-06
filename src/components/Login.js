import React, { useState, useRef } from 'react';
import { validateDetails } from '../utils/validate';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import Header from './Header';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const displayName = useRef(null);
  const dispatch = useDispatch();
  const handleBtnClick = () => {
    const message = validateDetails(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      // sign up the user
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: displayName.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    }
  };
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={
            'https://assets.nflxext.com/ffe/siteui/vlv3/0552717c-9d8c-47bd-9640-4f4efa2de663/537e2c5e-c750-4d4c-9f7a-e66fe93eb977/IN-en-20240701-POP_SIGNUP_TWO_WEEKS-perspective_WEB_b00eeb83-a7e8-4b5b-8ff7-86ed92c51caf_large.jpg'
          }
          alt="movie posters background"
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="text-white rounded-lg w-4/12 p-12 absolute bg-black my-36 mx-auto right-0 left-0 bg-opacity-80"
      >
        <h1 className="font-bold text-3xl px-2 py-4">
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            ref={displayName}
            className="p-4 my-4 bg-gray-800 border border-white w-full bg-opacity-50"
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="p-4 my-4 bg-gray-800 border border-white w-full bg-opacity-50"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-4 bg-gray-800 border border-white w-full bg-opacity-50"
        />
        <p className="text-red-500 font-semibold">{errorMessage}</p>
        <button
          onClick={handleBtnClick}
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
        >
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p className="text-sm py-4 ">
          {isSignInForm ? 'New to AI-Flix?' : 'Already registered?'}
          <span
            onClick={toggleSignInForm}
            className="font-bold cursor-pointer mx-2"
          >
            {isSignInForm ? 'Sign Up Now' : 'Sign In Now'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
