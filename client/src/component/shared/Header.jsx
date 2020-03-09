import React from 'react'
import { NavLink } from 'react-router-dom'

import '../../style/Header.css'


const Header = props => (
  <header>
    <div className='header-logo-container'>
      <div className='header-logo-img'></div>
      <h1 className='header-name'>Terrarium</h1>
    </div>
    <NavLink className='header-new-experiment' exact to='/experiment/new'>
        <span>New Experiment</span>
    </NavLink>
    {props.currentUser.id &&
      (<div className='header-user-action'>
        <NavLink className='header-nav' exact to='/user/edit'>
          {props.currentUser.username}
        </NavLink>
      </div>)
    }
    {!props.currentUser.id &&
      (<div className='header-user-action'>
        <NavLink className='header-nav header-login' exact to='/user/login'>
          Log In
        </NavLink>
        <br />
        <NavLink className='header-nav header-signup' exact to='/user/signup'>
          Sign Up
        </NavLink>
      </div>)
    }
  </header>
)

export default Header
