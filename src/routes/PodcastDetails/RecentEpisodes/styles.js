export default theme => ({
  root: {
    position: 'relative'
  },
  static: {
    position: 'relative',
    height: theme.spacing(10)
  },
  list: {
    border: `1px solid ${theme.palette.divider}`,
    padding: 0,
    marginTop: theme.spacing(2)
  }
})
