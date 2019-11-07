import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import pick from 'lodash/pick'
import PropTypes from 'prop-types'

import { formSubmit } from 'utils/form'
import { getUser, updateUser, userSelector, userLoadingSelector } from 'redux/modules/user'
import { SNACKBAR_TYPE } from 'config/constants'
import { getFullName } from 'utils/helpers'
import Breadcrumbs from 'components/Breadcrumbs'
import LoadingIndicator from 'components/LoadingIndicator'
import UserForm, { validationSchema } from '../../components/UserForm'
import styles from './styles'

const useStyles = makeStyles(styles)

const UserEdit = ({ user, userLoading, updateUser, getUser, match }) => {
  const { enqueueSnackbar } = useSnackbar()
  const { userId } = match.params
  const classes = useStyles()

  useEffect(() => {
    getUser({
      id: userId,
      fail: () => enqueueSnackbar('Failed to load user details!', { variant: SNACKBAR_TYPE.ERROR })
    })
  }, [userId, getUser, enqueueSnackbar])

  const handleSubmit = (values, actions) => {
    return formSubmit(
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
          validateOnChange={false}
          validateOnBlur
          component={UserForm}
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
