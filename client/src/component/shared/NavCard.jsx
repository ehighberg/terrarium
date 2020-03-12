import React from 'react'

const NavCard = props => {
  const { experiment, username } = props

  return (
    <div className='nav-card'>
      <div className='nav-card-top'>
        <p>Data: CCPP</p>
        <p>Author: {username}</p>
      </div>
      <div className='nav-card-mid'>
        <p>Linear Regression</p>
      </div>
      <div className='nav-card-bottom'>
        <p>Metric: {experiment.metric}</p>
        <p>Score: {experiment.final_score && experiment.final_score.toFixed(4)}</p>
      </div>
    </div>
  )
}

export default NavCard
