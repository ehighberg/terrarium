import React from 'react'

const Results = props => {

  return (
    <div className='results-container'>
      <div className='results-visual-container'>
        <img alt='results visualization' src='#' />
      </div>
      <div className='results-summary-container'>
        <p className='results-summary-title'>Results</p>
        <div className='results-summary-items'>
          {props.experiment.final_score && (
            <div className='results-final-score'>
              <p>Final R-Squared on test data: </p>
              <p>{props.experiment.final_score}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Results
