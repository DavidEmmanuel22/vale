import { ClientNavBar } from 'pages/Home/Home'
import React, { useEffect, useState, useContext, useRef } from 'react'
import { useHistory } from 'react-router'
import {
  createMessage,
  messageHistory,
  readMessage,
  clientMessageHistory
} from 'requests/createMail'
import { MessageRight, MessageLeft } from './Messages'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import CachedIcon from '@material-ui/icons/Cached'
import {
  TextField,
  Button,
  InputAdornment,
  Grid,
  Fab,
  Paper
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { useFormik } from 'formik'
import CircularProgress from '@material-ui/core/CircularProgress'
import { mailValidation } from './MailValidation'
import { UserContext } from 'context/userContext'
import { makeStyles } from '@material-ui/core/styles'
import { SessionExpired } from './SessionExpired'
import expired from '../../assets/Contact/expired.png'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  buttonPaper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,

    justifyContent: 'space-between'
  }
}))

export const Mail = () => {
  const classes = useStyles()
  const history = useHistory()
  if (history.location.state) {
    localStorage.setItem('email', history.location.state.email)
  }
  const email = localStorage.getItem('email')
  const idChat = localStorage.getItem('idChat')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(false)
  const [scroll, setScroll] = useState(false)
  const [showInvalidMessages, setShowInvalidMessages] = useState(false)
  const { user, logout } = useContext(UserContext)
  const [showSessionMessage, setShowSessionMessage] = useState(false)
  const messagesEndRef = useRef(null)
  const [getMessage, setGetMessage] = useState(false)
  const [message, setMessage] = useState({
    message: ''
  })
  const mailFormikValidation = useFormik({
    initialValues: message,
    onSubmit: async (formValue) => {
      setLoading(true)
      const { success, response, error } = await createMessage({
        idChat: localStorage.getItem('idChat'),
        email: email || user.email,
        dataMessage: formValue.message
      })
      if (success && response) {
        if (response.error) {
          //console.log(response.error)
          setGetMessage(true)
        } else {
          // console.log(response)
          setLoading(false)
          readMsg()
          scrollToBottom()
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
      setShowSessionMessage(false)
      //setShowInvalidMessages(false)
    }
  }

  const logOutMessages = () => {
    //    const myinterval = 60 * 60 * 1000
    const myinterval = 10000
    setInterval(function () {
      checkExpiration()
    }, myinterval)
  }

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current && scroll) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const session = localStorage.getItem('idChat')
    //check "my hour" index here
    if (session === null) {
      setShowInvalidMessages(false)
    }
    async function getMessages() {
      const { success, response, error } = await messageHistory(
        localStorage.getItem('idChat')
      )
      if (success && response) {
        //console.log(response.data)
        setMessages(response.data)
        if (response.data.length > 4) {
          setScroll(true)
        }
        setLoading(false)
        logOutMessages()
        setTimeout(() => {
          setReload(true)
        }, 5000)
      } else {
        //console.log(error)
      }
    }
    getMessages()
    scrollToBottom()
  }, [loading])

  const readMsg = async () => {
    const { success, response, error } = await readMessage({
      idChat: idChat
    })
    if (success && response) {
      //console.log(response.data)
      window.scrollTo(0, document.body.scrollHeight)
    } else {
      //console.log(error)
    }
  }

  const MessageContent = () => (
    <>
      {messages.map((msg, _) =>
        msg.message.email === email || msg.message.email === user.email ? (
          <MessageRight key={_} data={msg} />
        ) : (
          <MessageLeft key={_} data={msg} />
        )
      )}
    </>
  )

  return (
    <>
      <Grid item xs={12}>
        <Paper className={classes.buttonPaper}>
          <div
            style={{
              padding: '1.2em',
              height: `${messages.length < 5 ? '74vh' : ''}`
            }}
          >
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
              <>
                {!user && !showSessionMessage && !showInvalidMessages ? (
                  <Tooltip
                    placement="top"
                    style={{
                      position: 'fixed',
                      bottom: '12%',
                      zIndex: '99',
                      left: '3%'
                    }}
                    color="secondary"
                    onClick={() => {
                      logout()
                      history.push('/')
                    }}
                    title="Salir"
                  >
                    <Fab aria-label="exit">
                      <ExitToAppIcon />
                    </Fab>
                  </Tooltip>
                ) : null}
                {!user &&
                reload &&
                !showSessionMessage &&
                !showInvalidMessages ? (
                  <Tooltip
                    placement="bottom"
                    style={{
                      position: 'fixed',
                      top: '12%',
                      right: '3%',
                      zIndex: '99'
                    }}
                    color="secondary"
                    onClick={() => {
                      window.location.reload(true)
                    }}
                    title="Recargar"
                  >
                    <Fab aria-label="Reload">
                      <CachedIcon />
                    </Fab>
                  </Tooltip>
                ) : null}

                {showSessionMessage && !showInvalidMessages ? (
                  <SessionExpired />
                ) : (
                  <MessageContent />
                )}
                {showInvalidMessages && (
                  <div style={{ textAlign: 'center', marginTop: '9%' }}>
                    <img src={expired} />
                    <h2>Sesion Finalizada.</h2>
                    <span style={{ cursor: 'pointer' }}>
                      Favor de ir a su{' '}
                      <Link to="/contact">
                        <strong>Historial</strong>
                      </Link>{' '}
                      para cargar sus mensajes.
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </Paper>
        <div ref={messagesEndRef} />
      </Grid>
      {!loading && !showSessionMessage && !showInvalidMessages ? (
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
            style={{ borderRadius: '0px', height: '4em' }}
            type="submit"
            variant="contained"
            color="primary"
          >
            <SendIcon />
          </Button>
        </form>
      ) : null}
    </>
  )
}
