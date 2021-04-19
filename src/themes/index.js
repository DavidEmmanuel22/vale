import { createMuiTheme } from '@material-ui/core/styles'

export const blueTheme = createMuiTheme({
  palette: {
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: '#f9a02b',
      // dark: will be calculated from palette.primary.main,
      contrastText: 'white'
    },
    primary: {
      main: 'rgb(0, 119, 114)',
      contrastText: 'white'
    }
  }
})
