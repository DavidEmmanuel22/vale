import React from 'react'
import './NewMessage.css'

const NewMessage = () => {
  return (
    <div className="message-container">
      <div className="data-container">
        <img width="50" src="/images/no-avatar.png"></img>
        <div>
          <p>Angel Acevedo</p>
          <span>Valedor</span>
        </div>
        <span>Hace 3 horas</span>
      </div>
      <p>The message text and subject</p>
    </div>
  )
}

export default NewMessage
