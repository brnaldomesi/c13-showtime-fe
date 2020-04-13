import * as Yup from 'yup'

import { Field, Formik } from 'formik'
import { deserializeNetwork, serializeNetwork } from 'utils/serializers'

import Button from '@material-ui/core/Button'
import FormCheckbox from 'components/FormCheckbox'
import FormLockerInput from 'components/FormLockerInput'
import Grid from '@material-ui/core/Grid'
import Hr from 'components/Hr'
import LoadingIndicator from 'components/LoadingIndicator'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Network name is required')
})

const renderForm = networkId => props => {
  const isFresh = props.initialValues.name === ''
  const history = useHistory()

  const handleGoBack = () => {
    history.goBack()
  }

  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        name="name"
        label="Network Name"
        component={FormLockerInput}
        placeholder="My New Network"
        lockerName="config.lockedSyncFields"
        lockerValue="name"
      />
      <Typography variant="caption" color="textSecondary" display="block">
        Network Status
      </Typography>
      <Field name="status" label="Active" toggleValues={['INACTIVE', 'ACTIVE']} component={FormCheckbox} />
      <Hr />
      <Grid container justify="flex-end" spacing={2}>
        <Grid item>
          <Button color="primary" onClick={handleGoBack}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" type="submit">
            {isFresh ? 'ADD NEW NETWORK' : 'SAVE CHANGES'}
          </Button>
        </Grid>
      </Grid>
      {props.isSubmitting && <LoadingIndicator />}
    </form>
  )
}

const NetworkForm = ({ networkDetails, networkId, onSubmit }) => {
  const handleSubmit = (values, actions) => {
    return onSubmit(serializeNetwork(values), actions)
  }

  const initialValues = networkDetails ? deserializeNetwork(networkDetails) : {}
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      networkId={networkId}>
      {renderForm(networkId)}
    </Formik>
  )
}

NetworkForm.propTypes = {
  networkDetails: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  networkId: PropTypes.string
}

export default NetworkForm
