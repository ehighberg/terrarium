import React, { useEffect, useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'

import User from '../routes/User'
import Header from './Header'

import { userSignup, userLogin, userEdit, verifyUser } from '../../services/apiHelper'


const Main = props => {
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

  const handlePersistingToken = async () => {
    try {
      const user = await verifyUser()
      if (user.id) {
        const { username, email, name, id } = user
        setCurrentUser({
          username: username,
          email: email,
          name: name,
          id: id
        })
      }
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    handlePersistingToken()
  }, [])

  return (
    <React.Fragment>
      <Header currentUser={currentUser} />
      <main>
        <Switch>
          <Route path='/user' component={() => (
              <User
                currentUser={currentUser}
                handleSignup={handleSignup}
                handleLogin={handleLogin}
                handleEdit={handleEdit}
              />
          )} />
        </Switch>
      </main>
    </React.Fragment>
  )
}

export default Main
