import React, { useEffect, useRef } from 'react';
import companyLogo from '../utils/assets/ai-flix-logo.png';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { userIcon } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { setLanguage } from '../utils/configSlice';
import { supported_languages } from '../utils/lang';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate('/error');
      });
  };

  const changeLanguage = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });
    // unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between">
      <img src={companyLogo} alt="Logo" className="w-44" />
      {user && (
        <div className="flex gap-4 items-center">
          {showGptSearch && (
            <select
              className="p-2 bg-gray-500 rounded-lg"
              onChange={changeLanguage}
            >
              {supported_languages.map((lang) => {
                return (
                  <option key={lang.identifier} value={lang.value}>
                    {lang.value}
                  </option>
                );
              })}
            </select>
          )}
          <button
            onClick={handleGptSearchClick}
            className="py-2 px-4 bg-purple-800 rounded-lg text-white"
          >
            {showGptSearch ? 'Browse' : 'GPT Search'}
          </button>
          <span className="text-white">Hello {user?.displayName}</span>
          <img
            src={userIcon}
            alt="User Icon"
            className="cursor-pointer w-12 h-12"
          />
          <button
            onClick={handleSignOut}
            className="font-bold text-white p-2 border border-white"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
