import { ClientNavBar } from 'pages/Home/Home'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { createMessage, messageHistory } from 'requests/createMail'
import { MessageRight, MessageLeft } from './Messages'
import { TextField, Button, InputAdornment } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { useFormik } from 'formik'
import CircularProgress from '@material-ui/core/CircularProgress'
import { mailValidation } from './MailValidation'

const Mail = () => {
  const history = useHistory()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [getMessage, setGetMessage] = useState(false)
  const [message, setMessage] = useState({
    message: ''
  })
  //const { chat, message } = history.location.state

  //   const idChat = message.idChat
  //   console.log(message)

  //   if (message) {
  //     localStorage.setItem('idChat', idChat)
  //   }

  console.log(messages)
  const mailFormikValidation = useFormik({
    initialValues: message,
    onSubmit: async (formValue) => {
      setLoading(true)
      const { success, response, error } = await createMessage({
        idChat: localStorage.getItem('idChat'),
        dataMessage: formValue.message
      })
      if (success && response) {
        if (response.error) {
          //console.log(response.error)
          setGetMessage(true)
        } else {
          // console.log(response)
          setLoading(false)
        }
      }
      mailFormikValidation.resetForm({
        values: {
          message: ''
        }
      })
      setGetMessage(false)
    },
    validationSchema: mailValidation
  })

  const checkExpiration = () => {
    //check if past expiration date
    const values = localStorage.getItem('idChat')
    //check "my hour" index here
    if ((values !== null) < new Date()) {
      //history.push('/')
      localStorage.removeItem('idChat')
    }
  }

  const logOutMessages = () => {
    const myinterval = 30 * 60 * 1000 // 30 min interval
    setInterval(function () {
      checkExpiration()
    }, myinterval)
  }

  useEffect(() => {
    async function getMessages() {
      const { success, response, error } = await messageHistory(
        localStorage.getItem('idChat')
      )
      if (success && response) {
        setMessages(response.data)
        setLoading(false)
        logOutMessages()
      } else {
        //console.log(error)
      }
    }
    getMessages()
  }, [loading])

  const MessageContent = () => (
    <>
      <MessageLeft />
      <MessageRight data={messages} />
    </>
  )

  return (
    <>
      <ClientNavBar />
      <div style={{ padding: '1.2em', height: '100vh', overflowY: 'scroll' }}>
        {loading ? (
          <CircularProgress
            color="secondary"
            style={{
              position: 'fixed',
              width: '66px',
              height: '66px',
              left: '44%',
              top: '50%'
            }}
          />
        ) : (
          <MessageContent />
        )}
      </div>
      {!loading && (
        <form
          onSubmit={mailFormikValidation.handleSubmit}
          style={{
            position: 'sticky',
            bottom: '0',

            display: 'flex'
          }}
        >
          <TextField
            style={{
              width: '95%',
              backgroundColor: 'white'
            }}
            label="Mensaje"
            variant="filled"
            name="message"
            value={mailFormikValidation.values.message}
            onChange={mailFormikValidation.handleChange}
            error={
              mailFormikValidation.touched.message &&
              Boolean(mailFormikValidation.errors.message)
            }
            helperText={
              mailFormikValidation.touched.message &&
              mailFormikValidation.errors.message
            }
          />
          <Button
            style={{ borderRadius: '0px' }}
            type="submit"
            variant="contained"
            color="primary"
          >
            <SendIcon />
          </Button>
        </form>
      )}
    </>
  )
}

export default Mail
