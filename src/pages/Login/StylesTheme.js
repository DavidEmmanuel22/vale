import { createMuiTheme } from '@material-ui/core/styles'

const StylesTheme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        '&:hover': {
          BoderBottom: '2px solid #eaeaea'
        },
        '&:before': {
          BoderBottom: '2px solid #eaeaea'
        }
      }
    }
  }
})

export default StylesTheme
