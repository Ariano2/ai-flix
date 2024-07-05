import React, { useState } from 'react';
import Header from './Header';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
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
      <form className="text-white rounded-lg w-4/12 p-12 absolute bg-black my-36 mx-auto right-0 left-0 bg-opacity-80">
        <h1 className="font-bold text-3xl px-2 py-4">
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 bg-gray-800 border border-white w-full bg-opacity-50"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 bg-gray-800 border border-white w-full bg-opacity-50"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 bg-gray-800 border border-white w-full bg-opacity-50"
        />
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg">
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
