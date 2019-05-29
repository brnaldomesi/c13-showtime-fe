export default theme => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 700,
    maxWidth: '100%'
  },
  summary: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  actions: {
    whiteSpace: 'nowrap'
  },
  edit: {
    marginRight: theme.spacing.unit * 2
  }
})