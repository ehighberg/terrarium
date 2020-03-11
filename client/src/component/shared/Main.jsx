import React, { useEffect, useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'

import '../../style/Main.css'
import User from '../routes/User'
import Home from '../routes/Home'
import Header from './Header'
import Footer from './Footer'
import Nav from './Nav'

import { userSignup,
  userLogin,
  userEdit,
  verifyUser,
  getAllExperiments,
  getAllUsernames,
  unauthorizeUser } from '../../services/apiHelper'


const Main = props => {
  const [currentUser, setCurrentUser] = useState({})
  const [experiments, setExperiments] = useState([])
  const [usernameMap, setUsernameMap] = useState([])

  const history = useHistory()

  const handleSignup = async (signUpData) => {
    await userSignup(signUpData)
    history.push('/user/login')
  }

  const handleLogin = async (loginData) => {
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
    await userEdit(editData, currentUser.id)
    setCurrentUser(editData)
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
      console.error(e)
    }
  }

  const fetchAllExperiments = async () => {
    try {
      const experiments = await getAllExperiments()
      setExperiments(experiments)
    } catch(e) {
      console.error(e)
    }
  }

  const fetchAllUsernames = async () => {
    try {
      const allUsernames = await getAllUsernames()
      setUsernameMap(allUsernames)
    } catch(e) {
      console.error(e)
    }
  }

  const logoutUser = () => {
    unauthorizeUser()
    setCurrentUser({})
    history.push('/')
  }

  useEffect(() => {
    fetchAllUsernames()
    handlePersistingToken()
    fetchAllExperiments()
  }, [])

  return (
    <React.Fragment>
      <Header currentUser={currentUser} />
      <div className='main-flex-container'>
        <main>
          <Switch>
            <Route exact path='/'><Home /></Route>
            <Route path='/user' component={() => (
              <User
                currentUser={currentUser}
                handleSignup={handleSignup}
                handleLogin={handleLogin}
                handleEdit={handleEdit}
                logoutUser={logoutUser}
              />
            )} />
          </Switch>
        </main>
        <Nav experiments={experiments} usernameMap={usernameMap}/>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Main