import { createMuiTheme } from '@material-ui/core/styles'

const StylesTheme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        '&:hover': {
          backgroundColor: '#007772'
        }
      }
    }
  }
})

export default StylesTheme
