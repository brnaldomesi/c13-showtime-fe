export default theme => ({
  root: {
    width: '100%'
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
  image: {
    width: 50,
    height: 50
  },
  actions: {
    whiteSpace: 'nowrap'
  },
  episodes: {
    marginRight: theme.spacing(2)
  },
  emptyListWrapper: {
    padding: theme.spacing(3)
  }
})

export const tableCellStyles = theme => ({
  root: {
    padding: theme.spacing(1)
  }
})
