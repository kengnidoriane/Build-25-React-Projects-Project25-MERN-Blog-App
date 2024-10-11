import React from 'react'
import './style-modules.css';
import { Link } from 'react-router-dom'


export default function Header() {
  return (
    <div className={'header'}>
      <h3>Mern Blog App</h3>
      <ul>
        
        <Link to={'/'}><li>Home</li> </Link>
        <Link to={'/add-blog'}> <li>Add Blog</li> </Link>

        
      </ul>
    </div>
  );
}
