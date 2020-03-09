import React from 'react'
import { Route, Switch } from 'react-router-dom'

import UserForm from '../routes/UserForm'


const User = props => {

  return (
    <div className='user-container'>
      <h1>User</h1>
      <Switch>
        <Route exact path='/user/signup'>
          <UserForm handleSubmit={props.handleSignup} actionType={'signup'} />
        </Route>
        <Route exact path='/user/login'>
          <UserForm handleSubmit={props.handleLogin} actionType={'login'} />
        </Route>
        <Route exact path='/user/edit'>
          <UserForm currentUser={props.currentUser} handleSubmit={props.handleEdit} actionType={'edit'} />
        </Route>
      </Switch>
    </div>
  )
}

export default User
