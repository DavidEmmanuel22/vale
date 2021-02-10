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
        BoxShadow: '-1px 3px 13px -3px rgba(8,8,8,8)',
        '&:hover': {
          backgroundColor: '#efc64f'
        },
        transition: 'none'
      }
    }
  }
})

export default StylesTheme
