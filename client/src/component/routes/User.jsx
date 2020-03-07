import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

import UserSign from '../routes/UserSign'

import { userSignup, userLogin } from '../../services/apiHelper'


const User = props => {

  const history = useHistory()

  const handleSignup = async (signUpData) => {
    console.log('signup')
    await userSignup(signUpData)
    history.push('/user/login')
  }

  const handleLogin = async (loginData) => {
    console.log('login')
    await userLogin(loginData)
    history.push('/')
  }

  return (
    <div className='user-container'>
      <h1>User</h1>
      <Switch>
        <Route exact path='/user/signup'>
          <UserSign handleSubmit={handleSignup} isSignup={true} />
        </Route>
        <Route exact path='/user/login'>
          <UserSign handleSubmit={handleLogin} isSignup={false} />
        </Route>
      </Switch>
    </div>
  )
}

export default User
