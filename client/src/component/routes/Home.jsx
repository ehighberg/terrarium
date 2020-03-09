import React from 'react'

import '../../style/Home.css'

const Home = () => (
  <div className='home-container'>
    <p className='home-welcome-message'>
      Welcome to Terrarium!
    </p>
    <div className='home-browse-message'>
      <p>Please select an experiment from the scroll to view, or sign in and start experimenting!</p>
    </div>
  </div>
)

export default Home
