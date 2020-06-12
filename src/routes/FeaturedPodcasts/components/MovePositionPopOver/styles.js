export default theme => ({
  popOverContainer: {
    overflow: 'unset'
  },
  popOver: {
    '&:before': {
      content: "' '",
      transform: 'translateY(100%)',
      position: 'absolute',
      bottom: 0,
      right: theme.spacing(2),
      borderTop: '10px solid white',
      borderRight: '10px solid transparent',
      borderLeft: '10px solid transparent',
      borderBottom: 'none',
      zIndex: 10
    }
  }
})
