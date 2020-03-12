import React from 'react'
import { Formik, Field, Form } from 'formik'

const Parameters = props => {

  return (
    <div className='params-container'>
      <p className='params-title'>Hyperparameters</p>
      <Formik
        initialValues={props.model}
        onSubmit={(values) => {
          props.handleCreate(values, props.model.user_id)
        }}
      >
        <Form>
          <div className='params-form-learn'>
            <label>Learning Rate: </label>
            <Field
              type='number'
              name="learning_rate"
              step="0.01"
              min="0.01"
              max="1"
            />
          </div>
          <br />
          <div className='params-form-iters'>
            <label>Number of iterations: </label>
            <Field
              type='number'
              name="max_iterations"
              step="1"
              min="10"
              max="1000"
            />
          </div>
          {props.model.user_id ?
            <button className='params-form-submit' type='submit'>
              Run Experiment
            </button> :
            <button className='params-form-delete' onClick={props.handleDelete}>
              Delete Experiment
            </button>
          }
        </Form>
      </Formik>
    </div>
  )
}

export default Parameters
