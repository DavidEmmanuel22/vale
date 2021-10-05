import { ClientNavBar } from 'pages/Home/Home'
import React, { useEffect, useState, useContext, useRef } from 'react'
import { useHistory } from 'react-router'
import {
  createMessage,
  messageHistory,
  readMessage,
  clientMessageHistory,
  createMailToken,
  createMail
} from 'requests/createMail'
import { MessageRight, MessageLeft, MessageNot } from './Messages'
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
import Countdown from 'react-countdown';
import jwtDecode from 'jwt-decode'

const useStyles = makeStyles((theme) => ({
  buttonPaper: {
    color: 'black',
    marginTop: '5%',
    justifyContent: 'space-between'
  },
  countDownHide: {
    color: 'white',
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
  const [userData, setUserData] = useState(false)

  
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
      }      mailFormikValidation.resetForm({
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
    window.scrollTo(0, document.body.scrollHeight)

  }

  useEffect(() => {
   decodedJwt()
   createChat()
   getMessages()
   scrollToBottom()

  }, [loading])
  async function decodedJwt(){
    const tokenAuth = localStorage.getItem('auth-token')
    if(tokenAuth){
      const decoded = await jwtDecode(tokenAuth)
      setUserData(decoded.user)
    }
   
  }
  async function createChat(){
    
    const session = localStorage.getItem('idChat')
    //check "my hour" index here
    if (session === null) {

      const { success, response, error } = await createMailToken({
        name: userData.firstName,
        emailUser: email || user.email,
        telUser: 0,
      })
      console.log(email)
      console.log(user.email)
      if (success && response) {
       
        if (response.error) {
          console.log("error"+ response.error)
          if(response.error === "EL usuario ya tiene un chat creado")
            localStorage.setItem('idChat', response.meta._id)

        //	setErrorCreateChat(true)
      //		setOpenErrorAlert(true)
         
        } else {
        //	setOpenAlert(true)
        //	setLoading(false)
          
        }
      }
    }
  }
  async function getMessages() {
    const { success, response, error } = await messageHistory(
      localStorage.getItem('idChat')
    )
    if (success && response) {
      //console.log(response.data)
      setMessages(response.data)
      if (response.data.length > 2) {
        setScroll(true)
      }
      setLoading(false)
      //logOutMessages()
      setTimeout(() => {
        setReload(true)
      }, 0)
    } else {
      //console.log(error)
    }
  }
  
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
      {
        messages.length === 0 ?(
          <MessageNot  data={"Aún no tiene mensajes por ver"} />

          ):(
            messages.map((msg, _) =>
        
            msg.message.email === email || msg.message.email === user.email ? (
              <MessageRight key={_} data={msg} />
            ) : (
              <MessageLeft key={_} data={msg} />
            )
          )
        )
      }

      
     
    </>
  )

  return (
    <>
      <Grid item xs={12}>
        <Paper className={classes.buttonPaper} style={{ borderRadius: '10px 10px 0px 0px'  }}>
        {userData.role === "Valedor" || userData.role ==="Bussines"  ? ( 
         <div style={{
          backgroundColor: 'rgb(0, 119, 114)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          minHeight: '60px',
          borderRadius: '10px 10px 0 0',
          color: '#fff',
          position: 'sticky',
          top: '80px',
          zIndex: '100',
          marginTop: "-16px",
          marginBottom: "100px;",
          width: "100%"
         }}> 
          <Tooltip color='secondary' onClick={() => window.location.reload(true)} title='Recargar'>
                     <IconButton aria-label='delete'>
                         <CachedIcon />
                     </IconButton>
                 </Tooltip>
           <h2>Mensajes</h2>
       </div>
        
        ) : ( null)
         
         }

         
          <div
            style={{
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
                { !userData    ? (
                    <Countdown 
                    date={Date.now() + 300000/*1200000*/}
                    className={classes.countDownHide}
                    autoStart = {true}
                    >
                      <SessionExpired />
                    </Countdown>                
                ) : (
                  <Countdown 
                  date={Date.now() + 300000/*1200000*/}
                  className={classes.countDownHide}
                  >
                  </Countdown>
                )}
             
                { showSessionMessage && !showInvalidMessages ? (
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
            width: '100%',
            display: 'flex'
          }}
        >
          <TextField
          autoFocus
            style={{
              width: '100%',
              backgroundColor: 'white'
            }}
            label={mailFormikValidation.touched.message ? (mailFormikValidation.errors.message):("Mensaje")}
            variant="filled"
            name="message"
            value={mailFormikValidation.values.message}
            onChange={mailFormikValidation.handleChange}
            error={
              mailFormikValidation.touched.message &&
              Boolean(mailFormikValidation.errors.message)
            }
            placeholder={mailFormikValidation.errors.message}
            placeholderTextColor="#000" 

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
