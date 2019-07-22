export default theme => ({
  root: {
    overflowY: 'auto',
    flexGrow: 1,
    padding: theme.spacing(3),
    display: 'flex'
  },
  toolbar: theme.mixins.toolbar
})
