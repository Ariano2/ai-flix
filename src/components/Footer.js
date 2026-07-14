import React from 'react';
import { GITHUB_REPO_URL, LINKEDIN_URL } from '../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 text-sm text-center py-6 px-4 border-t border-gray-800">
      <p>
        Created by <span className="text-white font-medium">Aryan Gosain</span>
      </p>
      <div className="flex justify-center gap-6 mt-2">
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          GitHub Repo
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
