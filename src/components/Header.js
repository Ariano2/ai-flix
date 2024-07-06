import React from 'react';
import companyLogo from '../utils/assets/ai-flix-logo.png';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        navigate('/error');
      });
  };
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between">
      <img src={companyLogo} alt="Logo" className="w-44" />
      {user && (
        <div className="flex gap-4 items-center">
          <span>Hello {user?.displayName}</span>
          <img
            src={
              'https://occ-0-2159-3647.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABUMx6z-7bB7tyN-OZXt6i8BXuZHN5EWBr7MQy7ilhubrpI2yOofVtT-QmoO6VJt7I1ewosmuQa29BGFfOOVcJxdKx1sT-co.png?r=201'
            }
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
