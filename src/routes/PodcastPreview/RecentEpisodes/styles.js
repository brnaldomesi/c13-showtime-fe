export default theme => ({
  root: {
    position: 'relative'
  },
  relative: {
    position: 'relative',
    height: theme.spacing(20)
  },
  list: {
    border: `1px solid ${theme.palette.divider}`,
    padding: 0,
    marginTop: theme.spacing(2)
  }
})
