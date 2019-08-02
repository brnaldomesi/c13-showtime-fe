export default theme => ({
  root: {
    width: '100%'
  },
  table: {
    minWidth: 700,
    maxWidth: '100%'
  },
  nowrap: {
    whiteSpace: 'nowrap'
  },
  summary: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  image: {
    width: 100,
    height: 100
  },
  actions: {
    whiteSpace: 'nowrap'
  },
  episodes: {
    marginRight: theme.spacing(1)
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
