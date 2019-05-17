import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Content from 'components/Content'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import styles from './styles'

const MainLayout = ({ classes, children }) => {
  const [sidebarOpen, toggleSidebar] = useState(false)
  return (
    <div className={classes.root}>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar toggle={toggleSidebar} open={sidebarOpen} />
      <Content>
        {children}
      </Content>
    </div>
  )
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainLayout)