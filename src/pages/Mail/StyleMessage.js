import { createStyles, makeStyles } from '@material-ui/core/styles'

export const styleMessage = makeStyles((theme) =>
  createStyles({
    messageRow: {
      display: 'flex'
    },
    messageRowRight: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    messageAdmin: {
      position: 'relative',
      marginLeft: '20px',
      marginBottom: '27px',
      padding: '12px',
      backgroundColor: '#e6e6e6',
      width: '60%',
      //height: "50px",
      textAlign: 'left',
      font: "400 .9em 'Open Sans', sans-serif",
      border: '1px solid #e6e6e6',
      borderRadius: '10px',
      '&:after': {
        content: "''",
        position: 'absolute',
        width: '0',
        height: '0',
        borderTop: '15px solid #e6e6e6',
        borderLeft: '15px solid transparent',
        borderRight: '15px solid transparent',
        top: '0',
        left: '-15px'
      },
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '0',
        height: '0',
        borderTop: '17px solid #e6e6e6',
        borderLeft: '16px solid transparent',
        borderRight: '16px solid transparent',
        top: '-1px',
        left: '-17px'
      }
    },
    messageUser: {
      position: 'relative',
      marginRight: '20px',
      marginBottom: '27px',
      padding: '12px',
      color: 'white',
      backgroundColor: '#068274',
      width: '60%',
      textAlign: 'left',
      font: "400 .9em 'Open Sans', sans-serif",
      border: '1px solid #068274',
      borderRadius: '10px',
      '&:after': {
        content: "''",
        position: 'absolute',
        width: '0',
        height: '0',
        borderTop: '15px solid #068274',
        borderLeft: '15px solid transparent',
        borderRight: '15px solid transparent',
        bottom: '-10px',
        right: '0'
      },
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '0',
        height: '0',
        borderTop: '17px solid #068274',
        borderLeft: '16px solid transparent',
        borderRight: '16px solid transparent',
        bottom: '-12px',
        right: '0'
      }
    },

    messageContent: {
      padding: 'inherit',
      margin: 0,
      fontSize: '15px'
    },
    messageTimeStampRight: {
      position: 'absolute',
      fontSize: '1.2em',
      fontWeight: '300',
      marginTop: '10px',
      bottom: '0px',
      right: '39px'
    },

    messageLeftAvatar: {
      backgroundColor: '#0c7d75',
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    avatarNothing: {
      color: 'transparent',
      backgroundColor: 'transparent',
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    displayName: {
      marginLeft: '20px'
    }
  })
)
