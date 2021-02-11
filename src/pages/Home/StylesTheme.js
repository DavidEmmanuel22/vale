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
        color: '#007772'
      }
    },
    MuiAppBar: {
      root: {
        height: '90px'
      }
    },
    MuiButton: {
      root: {
        '&:hover': {
          backgroundColor: '#efc64f'
        },
        transition: 'none',
        boxShadow: '0 7px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)'
      }
    }
  }
})

export default StylesTheme
