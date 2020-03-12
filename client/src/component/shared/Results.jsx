import React from 'react'

import { drawLineChart } from '../../services/chart'

const Results = props => {
  if (props.experiment.final_score) {
    setTimeout(() => drawLineChart(props.experiment.history.loss), 1)    
  }

  return (
    <div className='results-container'>
      <figure id='wrapper' className='results-visual-container'>
        <div></div>
      </figure>
      <div className='results-summary-container'>
        <p className='results-summary-title'>Results</p>
        <div className='results-summary-items'>
          {props.experiment.final_score && (
            <div className='results-final-score'>
              <p>Final R-Squared on test data: </p>
              <p>{props.experiment.final_score.toFixed(4)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Results
