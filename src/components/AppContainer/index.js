import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

const AppContainer = ({ children }) => (
  <div>
    <CssBaseline />
    {children}
  </div>
)

export default AppContainer
