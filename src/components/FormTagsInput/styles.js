import { emphasize } from '@material-ui/core/styles'

export default theme => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  inputRow: {
    padding: theme.spacing(1) / 2,
    border: `1px solid rgba(0, 0, 0, .23)`,
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  label: {
    marginTop: 0,
    marginBottom: theme.spacing(1),
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 'auto',
    margin: 4,
    alignSelf: 'stretch'
  },
  select: {
    flex: 1
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
})
