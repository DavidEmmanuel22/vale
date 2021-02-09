import { createMuiTheme } from '@material-ui/core/styles'

const StylesTheme = createMuiTheme({
  overrides: {
    MuiTabs: {
      flexContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '3px 10%'
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
        fontWeight: '600',
        textTransform: 'capitalize'
      },
      textColorInherit: {
        color: '#2d6a4f'
      }
    },
    MuiButton: {
      root: {
        fontWeight: '600',
        textTransform: 'capitalize',
        borderRadius: '14px',
        color: 'white'
      },
      '&:hover': {
        backgroundColor: '#efc64f'
      },
      colorInherit: {
        backgroundColor: '#efc64f'
      },
      textSizeSmall: {
        padding: '5px 8px'
      }
    },
    MuiAppBar: {
      root: {
        height: '80px'
      }
    }
  }
})

export default StylesTheme
