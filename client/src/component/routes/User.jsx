import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

import UserForm from '../routes/UserForm'

import { userSignup, userLogin, userEdit, getUser } from '../../services/apiHelper'


const User = props => {
  const [currentUser, setCurrentUser ] = useState({})

  const history = useHistory()

  const handleSignup = async (signUpData) => {
    console.log('signup')
    await userSignup(signUpData)
    history.push('/user/login')
  }

  const handleLogin = async (loginData) => {
    console.log('login')
    const user = await userLogin(loginData)
    const { username, email, name, id } = user
    setCurrentUser({
      username: username,
      email: email,
      name: name,
      id: id
    })
    history.push('/')
  }

  const handleEdit = async (editData) => {
    console.log('edit')
    await userEdit(editData, currentUser.id)
    history.push('/')
  }

  return (
    <div className='user-container'>
      <h1>User</h1>
      <Switch>
        <Route exact path='/user/signup'>
          <UserForm handleSubmit={handleSignup} actionType={'signup'} />
        </Route>
        <Route exact path='/user/login'>
          <UserForm handleSubmit={handleLogin} actionType={'login'} />
        </Route>
        <Route exact path='/user/edit'>
          <UserForm currentUser={currentUser} handleSubmit={handleEdit} actionType={'edit'} />
        </Route>
      </Switch>
    </div>
  )
}

export default User
