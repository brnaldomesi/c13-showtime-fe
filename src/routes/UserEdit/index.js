import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik, Field } from 'formik'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import pick from 'lodash/pick'
import PropTypes from 'prop-types'
import * as Yup from 'yup'

import { formSubmit } from 'utils/form'
import { getUser, updateUser, userSelector, userLoadingSelector } from 'redux/modules/user'
import { SNACKBAR_TYPE } from 'config/constants'
import { getFullName } from 'utils/helpers'
import Breadcrumbs from 'components/Breadcrumbs'
import FormCheckbox from 'components/FormCheckbox'
import FormInput from 'components/FormInput'
import Hr from 'components/Hr'
import LoadingIndicator from 'components/LoadingIndicator'
import styles from './styles'

const useStyles = makeStyles(styles)

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('User email is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required')
})

const renderForm = ({ handleSubmit, isSubmitting }) => (
  <form onSubmit={handleSubmit}>
    <Grid container spacing={3}>
      <Grid item sm={6}>
        <Field name="firstName" label="First Name" component={FormInput} placeholder="E.g. John" />
      </Grid>
      <Grid item sm={6}>
        <Field name="lastName" label="Last Name" component={FormInput} placeholder="E.g. Doe" />
      </Grid>
    </Grid>
    <Field name="email" label="Email" component={FormInput} type="email" placeholder="e.g. john.doe@email.com" />
    <Field name="isActive" label="Active" toggleValues={[false, true]} component={FormCheckbox} />
    <Hr />
    <Grid container justify="flex-end" spacing={2}>
      <Grid item>
        <Button color="primary" type="submit" component={Link} to="/users">
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" type="submit">
          Save Changes
        </Button>
      </Grid>
    </Grid>
    {isSubmitting && <LoadingIndicator />}
  </form>
)

const UserEdit = ({ user, userLoading, updateUser, getUser, match }) => {
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()

  useEffect(() => {
    getUser({
      id: match.params.userId,
      fail: () => enqueueSnackbar('Failed to load user details!', { variant: SNACKBAR_TYPE.ERROR })
    })
  }, [match, getUser, enqueueSnackbar])

  const handleSubmit = (values, actions) => {
    formSubmit(
      updateUser,
      {
        id: match.params.userId,
        data: pick(values, ['firstName', 'lastName', 'email', 'isActive'])
      },
      actions
    )
  }

  if (userLoading) {
    return <LoadingIndicator />
  }

  return user ? (
    <div className={classes.root}>
      <Breadcrumbs />
      <Typography variant="h6" gutterBottom>
        Edit {getFullName(user)}
      </Typography>
      <Paper className={classes.paper}>
        <Formik
          initialValues={user}
          enableReinitialize
          onSubmit={handleSubmit}
          render={renderForm}
          validationSchema={validationSchema}
        />
      </Paper>
    </div>
  ) : null
}

UserEdit.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  userLoading: PropTypes.bool.isRequired
}

const selector = createStructuredSelector({
  user: userSelector,
  userLoading: userLoadingSelector
})

const actions = {
  getUser,
  updateUser
}

export default connect(
  selector,
  actions
)(UserEdit)
