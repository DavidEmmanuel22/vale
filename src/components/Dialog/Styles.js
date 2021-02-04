import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles(() => ({
  MuiDialogContentRoot: (props) => ({
    padding: '0px'
  }),
  MuiDialogContentroot: (props) => ({
    '&:first-child': {
      paddingTop: '0px'
    }
  })
}))

export default Styles
