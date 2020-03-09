import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer>
    <p className='footer-copyright'>
      &copy; {new Date().getFullYear()} Errol Highberg
    </p>
    <div className='footer-link-container'>
      <Link className='footer-link'>
        Linkedin
      </Link>
      <Link className='footer-link'>
        Github
      </Link>
      <Link className='footer-link'>
        Email
      </Link>
    </div>
  </footer>
)

export default Footer
