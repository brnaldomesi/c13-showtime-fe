export default theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(1)
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
    marginRight: theme.spacing(2)
  }
})
