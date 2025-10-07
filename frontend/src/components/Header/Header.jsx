// Importing React
import React from 'react';

// Importing Link from react-router-dom
import { Link } from 'react-router-dom';

// Importing CSS
import './header.css';

export default function Header() {
  return (
    <header className='header header_animation'>
        {/* Logo container */}
        <div className='header_logo_container'>
          <h1 className='header_logo'>Dashboard</h1>            
        </div>

        {/* Nav Links container */}
        <div className='header_nav_links_container'>
          <Link to="/" className='header_nav_link'>Home</Link>
          <Link to="/form" className='header_nav_link'>Form</Link>
          <Link to="/dashboard" className='header_nav_link'>Dashboard</Link>
        </div>

        {/* Action buttons container */}
        <div className='header_action_buttons_container'>
          <Link to="/form" className='header_action_button'>
            <span className='action_button_text_container'>
              <span className='action_button_default_text'>Bắt đầu ngay</span>
              <span className='action_button_hover_text'>Bắt đầu ngay</span>
            </span>
          </Link>
        </div>
    </header>
  );
}