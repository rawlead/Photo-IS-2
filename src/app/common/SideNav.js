import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideNav.css';

const SideNav = ({toggleMobileMenu}) => (
  <ul className="nav flex-column" id="left-nav">
    <li>
      <NavLink exact to="/profile" onClick={toggleMobileMenu}>MY PROFILE</NavLink>
    </li>
    <li>
      <NavLink to="/authors" onClick={toggleMobileMenu}>AUTHORS</NavLink>
    </li>
    <li>
      <NavLink to="/photos" onClick={toggleMobileMenu}>PHOTOS</NavLink>
    </li>
    <li>
      <NavLink to="/about" onClick={toggleMobileMenu}>ABOUT</NavLink>
    </li>
    <li>
      <div className="creator"><p style={{ textAlign: 'right', margin: 0 }}>© 2018 Ivan Shyrai.<br />
        All rights reserved.</p></div>
    </li>
  </ul>
)

export default SideNav;
