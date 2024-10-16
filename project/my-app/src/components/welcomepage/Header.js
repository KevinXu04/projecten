import React from 'react';
import './style/Header.css';
import logo from './images/logo.png';
import profile from './images/profile.png'
import search_icon from './images/search-w.png'

const Header = () => {
  return (
    <div className='navbar'>
      <a href='/'>
        <img className='logo' src={logo}></img>
      </a>
      
      <ul>
        <li>About Us</li>
        <li>Customer Service</li>
        <li>How it works?</li>
      </ul>

      <div className='search-box'>
        <input type='text' placeholder='Search'></input>
        <img src={search_icon} alt=''></img>
      </div>

      <img src={profile} alt='' className='profile'></img>
    </div>
  );
};

export default Header;
