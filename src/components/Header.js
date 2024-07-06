import React, { useEffect } from 'react';
import companyLogo from '../utils/assets/ai-flix-logo.png';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { userIcon } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate('/error');
      });
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
