import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'


const UserForm = props => {

  const formBlankValues = () => {
    const values = {
      username: '',
      password: ''
    }
    const conditionalValues = (props.actionType === 'signup') ?
      {
        confirmPassword: '',
        email: '',
        name: ''
      } :
      {}
    return {...values, ...conditionalValues}
  }

  return (
    <div className='user-sign-container'>
      <h1>User Sign</h1>
      <Formik
        initialValues={
          (props.actionType === 'signup' || props.actionType === 'login') ?
          formBlankValues() :
          props.currentUser
        }
        onSubmit={props.handleSubmit}
        validate={(values) => {
          const errors = {}

          Object.keys(values).forEach((value) => {
            if (!values[value] && value !== 'name') {
              errors[value] = `${value} is a required field`
            }
          })

          if (props.actionType === 'signup' || props.actionType === 'edit') {
            if (values['password'].length < 8) {
              errors.password = 'Password must be at least 8 characters'
            } else if (values['password'] !== values['confirmPassword']) {
              errors.password = 'Passwords must match'
            }
          }

          if (values.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
          }

          return errors
        }}
      >
        <Form>
          <div className='user-form-entry'>
            <label>Username: </label>
            <Field type='text' name='username' />
            <ErrorMessage name='username' component='div' className='user-form-error'/>
            <br />
          </div>

          {(props.actionType === 'signup' || props.actionType === 'edit') && (
            <div className='user-form-entry'>
              <label>Name: </label>
              <Field type='text' name='name' />
              <ErrorMessage name='name' component='div' className='user-form-error'/>
              <br />
            </div>
          )}

          {(props.actionType === 'signup' || props.actionType === 'edit') && (
            <div className='user-form-entry'>
              <label>Email: </label>
              <Field type='email' name='email' />
              <ErrorMessage name='email' component='div' className='user-form-error'/>
              <br />
            </div>
          )}

          <div className='user-form-entry'>
            <label>Password: </label>
            <Field type='password' name='password' />
            <ErrorMessage name='password' component='div' className='user-form-error'/>
            <br />
          </div>

          {(props.actionType === 'signup' || props.actionType === 'edit') && (
          <div className='user-form-entry'>
            <label>Confirm Password: </label>
            <Field type='password' name='confirmPassword' />
            <ErrorMessage name='confirmPassword' component='div' className='user-form-error'/>
            <br />
          </div>
          )}

          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default UserForm
