import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { useHistory } from 'react-router'
import moment from 'moment'
import 'moment/min/locales'
import { styleMessage } from './StyleMessage'
import { messageHistory } from 'requests/createMail'
moment.locale('es')

export const MessageLeft = ({ data }) => {
  //console.log(data)
  const history = useHistory()
  const date = moment(data.message.dateMessage).format('MM/DD/YYYY  hh:mm A')

  const { message } = data
  const displayName = message.email ? message.email : 'Admin'
  const classes = styleMessage()
  return (
    <>
      <div className={classes.messageRow}>
        <Avatar
          alt={displayName}
          className={classes.messageLeftAvatar}
          src={'photoURL'}
        ></Avatar>
        <div style={{ width: '100%' }}>
          <div className={classes.displayName}>{displayName}</div>
          <div className={classes.messageAdmin}>
            <p className={classes.messageContent}>{message.message}</p>

            <div className={classes.messageTimeStampRight}>{date}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export const MessageRight = ({ data }) => {
  const classes = styleMessage()
  const date = moment(data.message.dateMessage).format('MM/DD/YYYY  hh:mm A')
  const message = data.message.message

  return (
    <div style={{ width: '100%' }}>
      {
        <div className={classes.messageRowRight}>
          <div className={classes.messageUser}>
            <p className={classes.messageContent}>{message}</p>
            <div className={classes.messageTimeStampRight}>{date}</div>
          </div>
        </div>
      }
    </div>
  )
}
