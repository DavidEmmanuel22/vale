import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from 'context/userContext'
import './NewMessage.css'
import moment from 'moment'
import 'moment/min/locales'
import CloseIcon from '@material-ui/icons/Close'
import { Mail } from 'pages/Mail/Mail'
moment.locale('es')
const NewMessage = ({ chat, clicked, readed, id }) => {
    if (!chat.lastMessage) {
        return null
    } else {
        return (
            <div
                key={id}
                onClick={() => clicked()}
                className='message-container'
                style={chat.readAdmin ? { backgroundColor: 'gainsboro' } : { backgroundColor: '#f9a02b94' }}
            >
                <span>
                    {chat.roleChat === 'Invited'
                        ? `${'Invitado'}`
                        : chat.roleChat === 'Bussines'
                        ? 'Negocio'
                        : chat.roleChat}
                </span>
                <div key={id} className='data-container'>
                    <img width='50' src='/images/no-avatar.png'></img>

                    <div key={id}>
                        <span>{chat.name}</span>
                        <p style={!chat.readAdmin ? { fontWeight: 'bold' } : null}>
                            {chat.lastMessage.substring(0, 50)}
                        </p>
                    </div>

                    <span style={chat.readAdmin ? { fontWeight: 'bold', backgroundColor: 'gainsboro' } : null}>
                        {moment(chat.lastDateMessage).format('MM/DD/YYYY  hh:mm A')}
                    </span>
                </div>
            </div>
        )
    }
}

export default NewMessage
