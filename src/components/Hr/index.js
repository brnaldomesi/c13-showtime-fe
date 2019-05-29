import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import styles from './styles'

const Hr = ({ classes }) => (
  <Divider className={classes.root} />
)

export default withStyles(styles)(Hr)
