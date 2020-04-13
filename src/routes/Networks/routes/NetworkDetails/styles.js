export default theme => ({
  content: {
    width: '100%'
  },
  paper: {
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
    marginRight: theme.spacing(1)
  },
  emptyListWrapper: {
    padding: theme.spacing(3)
  },
  titleButton: {
    paddingLeft: 0
  }
})

export const tableCellStyles = theme => ({
  root: {
    //padding: theme.spacing(1)
  }
})
