import { createMuiTheme } from '@material-ui/core/styles'

const StylesTheme = createMuiTheme({
  overrides: {
    MuiTabs: {
      flexContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '3px 13%'
      },
      indicator: {
        backgroundColor: 'transparent'
      },
      root: {
        marginTop: '10px'
      }
    },
    MuiTab: {
      root: {
        fontWeight: '500',
        textTransform: 'capitalize',
        fontSize: '18px'
      },
      textColorInherit: {
        color: '#2d6a4f'
      }
    },
    MuiAppBar: {
      root: {
        height: '80px'
      }
    },
    MuiButton: {
      root: {
        '&:hover': {
          backgroundColor: '#efc64f'
        },
        transition: 'none'
      }
    },
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
