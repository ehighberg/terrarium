import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

import '../../style/Experiment.css'
import Results from '../shared/Results'
import Parameters from '../shared/Parameters'
import { getExperiment } from '../../services/apiHelper'

const Experiment = props => {
  const [experiment, setExperiment] = useState({})
  const history = useHistory()
  const url = history.location.pathname.split('/')
  const slug = url[url.length - 1]

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


  useEffect(() => {
    const fetchExperiment = async (exp_id) => {
      const res = await getExperiment(exp_id)
      setExperiment(res)
    }
    if (parseInt(slug)) {
      fetchExperiment(slug)
    }
  }, [slug])

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
              currentUser={props.currentUser}
              experiment={newExperiment.experiment}
            />
          </div>
        </Route>
        <Route exact path='/experiment/:experiment_id'>
          {experiment.experiment && (
            <div className='experiment-container'>
              <Results
                experiment={experiment.experiment}
              />
              <Parameters
                handleCreate={props.handleCreate}
                model={experiment.model}
                handleDelete={props.handleDelete}
                currentUser={props.currentUser}
                userId={experiment.experiment.user_id}
                experimentId={experiment.experiment.id}
              />
            </div>
          )}
        </Route>
      </Switch>
    </React.Fragment>
  )
}

export default Experiment
