import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'

import UserSign from '../routes/UserSign'

const User = props => {

  return (
    <div className='user-container'>
      <h1>User</h1>
      <Switch>
        <Route exact path='/user/signup'>
          <UserSign isSignup={true} />
        </Route>
        <Route exact path='/user/signin'>
          <UserSign isSignup={false} />
        </Route>
      </Switch>
    </div>
  )
}

export default User
