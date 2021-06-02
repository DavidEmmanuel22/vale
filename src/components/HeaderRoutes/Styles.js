import { makeStyles } from '@material-ui/core'

const Styles = makeStyles(() => ({
  breadcrumbs: {
    padding: '25px 0',
    '& li': {
      textTransform: 'capitalize'
    }
  }
}))

export default Styles
