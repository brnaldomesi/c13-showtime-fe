import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import pick from 'lodash/pick'
import PropTypes from 'prop-types'

import { formSubmit } from 'utils/form'
import { getUser, createUser, userCreatingSelector } from 'redux/modules/user'
import Breadcrumbs from 'components/Breadcrumbs'
import LoadingIndicator from 'components/LoadingIndicator'
import UserForm, { validationSchema } from '../../components/UserForm'
import styles from './styles'

const useStyles = makeStyles(styles)

const initialValues = {
  firstName: '',
  lastName: '',
  email: ''
}

const UserNew = ({ userLoading, createUser, match, history }) => {
  const classes = useStyles()

  const handleSubmit = (values, actions) => {
    formSubmit(
      createUser,
      {
        id: match.params.userId,
        data: pick(values, ['firstName', 'lastName', 'email', 'isActive']),
        success: () => history.push('/users')
      },
      actions
    )
  }

  if (userLoading) {
    return <LoadingIndicator />
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs />
      <Typography variant="h6" gutterBottom>
        Create a New User
      </Typography>
      <Paper className={classes.paper}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          component={UserForm}
          validateOnChange={false}
          validateOnBlur
          validationSchema={validationSchema}
        />
      </Paper>
    </div>
  )
}

UserNew.propTypes = {
  createUser: PropTypes.func.isRequired,
  user: PropTypes.object
}

const selector = createStructuredSelector({
  userCreating: userCreatingSelector
})

const actions = {
  getUser,
  createUser
}

export default connect(
  selector,
  actions
)(UserNew)
