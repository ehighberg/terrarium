import React from 'react'
import { Switch, Route } from 'react-router-dom'

import User from '../routes/User'

const Main = props => (
  <main>
    <Switch>
      <Route exact path='/user' component={() => <User />} />
    </Switch>
  </main>
)

export default Main
