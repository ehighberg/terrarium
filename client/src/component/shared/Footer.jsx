import React from 'react'
import { Link } from 'react-router-dom'

import '../../style/Footer.css'

const Footer = () => (
  <footer>
    <p className='footer-copyright'>
      &copy; {new Date().getFullYear()} Errol Highberg
    </p>
    <div className='footer-link-container'>
      <Link className='footer-link' to='#'>
        LinkedIn
      </Link>
      <Link className='footer-link' to='#'>
        Github
      </Link>
      <Link className='footer-link' to='#'>
        Email
      </Link>
    </div>
  </footer>
)

export default Footer
