import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from 'context/userContext'
import './NewMessage.css'
import moment from 'moment'
import 'moment/min/locales'
import CloseIcon from '@material-ui/icons/Close'
import { Mail } from 'pages/Mail/Mail'
moment.locale('es')

const NewMessage = ({ chat, clicked }) => {
  //const history = useHistory()

  //  const { user } = useContext(UserContext)

  //console.log(chat)
  return (
    <div
      onClick={() => clicked()}
      // onClick={() => {
      //   history.push({
      //     pathname: '/mail',
      //     state: { email: user.email }
      //   })
      //   localStorage.setItem('idChat', chat._id)
      // }}
      className="message-container"
      style={
        !chat.readAdmin
          ? { fontWeight: 'bold', backgroundColor: 'gainsboro' }
          : null
      }
    >
      <span>
        {chat.roleChat === 'Invited' ? 'Invitado: Nuevo Mensaje' : ''}
      </span>
      <div className="data-container">
        <img width="50" src="/images/no-avatar.png"></img>
        <div>
          <span>{chat.from}</span>
        </div>
        <span>
          {moment(chat.lastDateMessage).format('MM/DD/YYYY  hh:mm A')}
        </span>
      </div>
      <p>{chat.lastMessage}</p>
    </div>
  )
  // ) : (
  //   <>
  //     <CloseIcon
  //       style={{ cursor: 'pointer' }}
  //       onClick={() => setShowMessages(!showMessages)}
  //     ></CloseIcon>
  //     <Mail />
  //   </>
  // )
}

export default NewMessage
