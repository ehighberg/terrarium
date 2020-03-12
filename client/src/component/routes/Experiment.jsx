import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Results from '../shared/Results'
import Parameters from '../shared/Parameters'

const Experiment = props => {
  const newExperiment = {
    experiment: {
      target: "net_energy",
      metric: "r2",
      user_id: props.currentUser.id,
      model: "linear_regression",
      dataset: "ccpp"
    },
    model: {
      standard_scale: true,
      learning_rate: 0.1,
      max_iterations: 50
    }
  }

  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/experiment/new'>
          <div className='experiment-container'>
            <Results
              experiment={newExperiment.experiment}
            />
            <Parameters
              handleCreate={props.handleCreate}
              model={newExperiment.model}
            />
          </div>
        </Route>
        <Route exact path='/experiment/:experiment_id'>
          <div className='experiment-container'>
            <Results
              experiment={props.experiment}
            />
            <Parameters
              handleCreate={props.handleCreate}
              model={props.model}
            />
          </div>
        </Route>
      </Switch>
    </React.Fragment>
  )
}

export default Experiment
