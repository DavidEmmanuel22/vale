import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { useHistory } from 'react-router'
import moment from 'moment'
import 'moment/min/locales'
import { styleMessage } from './StyleMessage'
moment.locale('es')

export const MessageLeft = (props) => {
  const history = useHistory()
  //console.log(history.location.state)
  const message = props.message
    ? props.message
    : 'Hola Bienvenido a Vale Valedor, ¿en que le podemos servir?'
  const timestamp = props.timestamp ? props.timestamp : ''
  const photoURL = props.photoURL ? props.photoURL : 'dummy.js'
  const displayName = props.displayName ? props.displayName : 'Admin'
  const classes = styleMessage()
  return (
    <>
      <div className={classes.messageRow}>
        <Avatar
          alt={displayName}
          className={classes.orange}
          src={photoURL}
        ></Avatar>
        <div>
          <div className={classes.displayName}>{displayName}</div>
          <div className={classes.messageBlue}>
            <div>
              <p className={classes.messageContent}>{message}</p>
            </div>
            <div className={classes.messageTimeStampRight}>{timestamp}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export const MessageRight = ({ data }) => {
  const classes = styleMessage()

  const MessagesHistory = data.map((chat, _) => {
    const message = chat.message.message
    const date = moment(chat.message.dateMessage).format('MM/DD/YYYY  hh:mm A')
    return (
      <div className={classes.messageRowRight} key={_}>
        <div className={classes.messageOrange}>
          <p className={classes.messageContent}>{message}</p>
          <div className={classes.messageTimeStampRight}>{date}</div>
        </div>
      </div>
    )
  })
  return <>{MessagesHistory}</>
}
