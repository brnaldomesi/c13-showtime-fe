import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { Field } from 'formik'
import { withStyles } from '@material-ui/core/styles'

import FormInput from 'components/FormInput'
import LoadingIndicator from 'components/LoadingIndicator'
import styles from './styles'

const LoginForm = ({ classes, errors, handleSubmit, isSubmitting }) => (
  <form onSubmit={handleSubmit}>
    <Field name="email" type="text" placeholder="Email" component={FormInput} fullWidth className={classes.field} />
    <Field
      name="password"
      type="password"
      placeholder="Password"
      component={FormInput}
      fullWidth
      className={classes.field}
    />
    {errors.globalError && (
      <Typography color="error" align="center" className={classes.error}>
        Invalid email or password
      </Typography>
    )}
    <section className={classes.sectionSubmit}>
      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
    </section>
    {isSubmitting && <LoadingIndicator />}
  </form>
)

LoginForm.propTypes = {
  classes: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool
}

export default withStyles(styles)(LoginForm)
