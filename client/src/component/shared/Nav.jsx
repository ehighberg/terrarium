import React from 'react'

import NavCard from './NavCard'
import '../../style/Nav.css'

const Nav = props => {
  const { experiments, usernameMap } = props

  return (
    <nav>
      {experiments && usernameMap && (
        experiments.map((experiment, i) => {
          const username = usernameMap[experiment.user_id]
          return <NavCard key={i} experiment={experiment} username={username} />
        })
      )}
    </nav>
  )
}

export default Nav
