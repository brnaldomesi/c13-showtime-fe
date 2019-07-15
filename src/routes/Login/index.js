import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { withStyles } from '@material-ui/core/styles'
import * as Yup from 'yup'

import LoginForm from './LoginForm'
import styles from './styles'
import { formSubmit } from 'utils/form'
import { authLogin } from 'redux/modules/auth'

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

class Login extends Component {
  static propTypes = {
    authLogin: PropTypes.func.isRequired
  }

  handleSubmit = (values, formActions) => {
    const { authLogin } = this.props
    return formSubmit(
      authLogin,
      {
        data: values
      },
      formActions
    )
  }

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center" gutterBottom>
          Login
        </Typography>
        <Formik
          component={LoginForm}
          onSubmit={this.handleSubmit}
          validationSchema={validationSchema}
        />
      </Paper>
    )
  }
}

const actions = {
  authLogin
}

export default compose(
  connect(null, actions),
  withStyles(styles),
)(Login)
