import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ setPage }) => {
  return (
    <nav className="w-48 h-screen bg-gray-800 p-4 fixed">
      <ul className="space-y-4">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/create" className="hover:underline">Create a Crewmate!</Link>
        </li>
        <li>
          <Link to="/gallery" className="hover:underline">Crewmate Gallery</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;