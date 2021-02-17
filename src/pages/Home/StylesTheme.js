import { createMuiTheme } from '@material-ui/core/styles'

const StylesTheme = createMuiTheme({
  overrides: {
    MuiTabs: {
      flexContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '1% 14%'
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
        fontSize: '21px'
      },
      textColorInherit: {
        color: '#007772'
      }
    },
    MuiAppBar: {
      root: {
        height: '110px'
      }
    },
    MuiButton: {
      root: {
        '&:hover': {
          backgroundColor: '#efc64f'
        },
        transition: 'none'
      }
    }
  }
})

export default StylesTheme
