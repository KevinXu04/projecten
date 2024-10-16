import React from 'react';
import './style/Footer.css'; // Ensure you have this file for styling
import logo from './images/logo.png';

// Importing icons (assuming you have them in the project)
import twitterIcon from './images/twitterIcon.png';
import linkedinIcon from './images/linkedinIcon.png';
import instagramIcon from './images/instagramIcon.png';

const Footer = () => {
  return (
    <footer>
      <div className='footerContainer'>
        <div className='socialIcons'>
          <a href='#'><i className='fa-brands fa-facebook'></i></a>
          <a href='#'><i className='fa-brands fa-facebook'></i></a>
          <a href='#'><i className='fa-brands fa-facebook'></i></a>
          <a href='#'><i className='fa-brands fa-facebook'></i></a>
        </div> 
        <div className='footerNav'>
          <li><a href='#'>Home</a></li>
          <li><a href='#'>Home</a></li>
          <li><a href='#'>Home</a></li>
          <li><a href='#'>Home</a></li>
          <li><a href='#'>Home</a></li>
        </div>
        <div className='footerBottom'>
          <p>Copyright &copy;2024; Designed by <span className='designer'>Kevin</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
