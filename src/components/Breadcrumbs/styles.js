export default theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(1, 2)
  },
  hasSidebar: {
    marginLeft: theme.cadence.sidebarWidth
  }
})
