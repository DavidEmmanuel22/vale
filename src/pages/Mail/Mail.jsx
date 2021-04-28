import { ClientNavBar } from 'pages/Home/Home'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { messageHistory } from 'requests/createMail'
import { MessageRight, MessageLeft } from './Messages'
import { TextField, Button, InputAdornment } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import CircularProgress from '@material-ui/core/CircularProgress'

const Mail = () => {
  const history = useHistory()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  //const { chat, message } = history.location.state

  //   const idChat = message.idChat
  //   console.log(message)

  //   if (message) {
  //     localStorage.setItem('idChat', idChat)
  //   }

  useEffect(() => {
    async function getMessages() {
      const { success, response, error } = await messageHistory(
        localStorage.getItem('idChat')
      )
      if (success && response) {
        setMessages(response.data)
        setLoading(false)
      } else {
        //console.log(error)
      }
    }
    getMessages()
  }, [])

  const MessageContent = () => {
    return (
      <>
        <MessageLeft />
        <MessageRight data={messages} />

        <form
          style={{
            position: 'sticky',
            bottom: '0',

            display: 'flex',
            zIndex: '100'
          }}
        >
          <TextField
            style={{
              width: '95%',
              backgroundColor: 'white'
            }}
            label="Mensaje"
            type="text"
            variant="filled"
          />
          <Button type="submit" variant="contained" color="primary">
            <SendIcon />
          </Button>
        </form>
      </>
    )
  }

  return (
    <>
      <ClientNavBar />
      <div style={{ padding: '1.2em' }}>
        {loading ? (
          <CircularProgress
            color="secondary"
            style={{
              position: 'fixed',
              width: '66px',
              height: '66px',
              left: '50%',
              top: '50%'
            }}
          />
        ) : (
          <MessageContent />
        )}
      </div>
    </>
  )
}

export default Mail
