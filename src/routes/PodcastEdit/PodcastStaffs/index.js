import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import StaffItem from '../StaffItem'

const PodcastStaffs = ({ match, staffs }) => (
  <Grid container spacing={2}>
    {staffs.map((item, index) => (
      <Grid item xs={12} key={item.guid}>
        <StaffItem number={index + 1} staff={item} />
      </Grid>
    ))}
    <Grid item xs={12}>
      <Button color="primary" variant="outlined" fullWidth component={Link} to={`${match.url}/new`}>
        Add staffer
      </Button>
    </Grid>
  </Grid>
)

PodcastStaffs.propTypes = {
  staffs: PropTypes.array.isRequired
}

export default PodcastStaffs
