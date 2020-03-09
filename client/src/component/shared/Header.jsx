import React from 'react'
import { NavLink } from 'react-router-dom'


const Header = props => (
  <div>
    <div className='header-logo-img'></div>
    <h1 className='header-name'>Terrarium</h1>
    <NavLink className='header-new-experiment' exact to='/experiment/new'>
        New Experiment
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
              <NavLink className='header-nav' exact to='/user/login'>
          Log In
        </NavLink>
        <NavLink className='header-nav' exact to='/user/signup'>
          Sign Up
        </NavLink>
      </div>)
    }
  </div>
)

export default Header
