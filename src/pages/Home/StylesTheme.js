import { createMuiTheme } from '@material-ui/core/styles'

const StylesTheme = createMuiTheme({
  overrides: {
    MuiTabs: {
      flexContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '23px 13%'
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
        fontWeight: '400',
        textTransform: 'capitalize',
        fontSize: '22px'
      },
      textColorInherit: {
        color: '#007772'
      }
    },
    MuiButton: {
      root: {
        fontWeight: '400',
        textTransform: 'capitalize',
        fontSize: '22px'
      },
      colorInherit: {
        color: 'white',
        backgroundColor: '#007772'
      },
      textSizeSmall: {
        padding: '5px 8px'
      }
    },
    MuiAppBar: {
      root: {
        height: '110px'
      }
    }
  }
})

export default StylesTheme
