import React from 'react';
import companyLogo from '../utils/assets/ai-flix-logo.png';

const Header = () => {
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10">
      <img src={companyLogo} alt="Logo" className="w-44" />
    </div>
  );
};

export default Header;
