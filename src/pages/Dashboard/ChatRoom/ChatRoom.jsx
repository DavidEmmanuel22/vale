import React from 'react'
import { Message } from '../Messages/Message'
import { NavBarChat } from '../NavBarChat/NavBarChat'

export const ChatRoom = () => {
  return (
    <div>
      <NavBarChat />
      <Message />
    </div>
  )
}
