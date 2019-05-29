export default theme => ({
  root: {
    overflowY: 'auto',
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar
})
