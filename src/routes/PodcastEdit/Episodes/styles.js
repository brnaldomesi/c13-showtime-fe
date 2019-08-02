export default theme => ({
  root: {
    width: '100%'
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
  nowrap: {
    whiteSpace: 'nowrap'
  },
  image: {
    width: 100,
    height: 100
  }
})

export const tableCellStyles = theme => ({
  root: {
    padding: theme.spacing(1)
  }
})
