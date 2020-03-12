import React from 'react'
import { NavLink } from 'react-router-dom'

import NavCard from './NavCard'
import '../../style/Nav.css'

const Nav = props => {
  const { experiments, usernameMap } = props

  return (
    <nav>
      {experiments && usernameMap && (
        experiments.map((experiment, i) => {
          const username = usernameMap[experiment.user_id]
          return (
            <NavLink key={i} exact to={`/experiment/${experiment.id}`} >
              <NavCard key={i} experiment={experiment} username={username} />
            </NavLink>
            )
        })
      )}
    </nav>
  )
}

export default Nav
